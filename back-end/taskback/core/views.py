from rest_framework import generics
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status 
from .models import Task, TaskStatus
from .serializers import (
    TaskSerializer, TaskReadSerializer,
    StatusUpdateSerializer,
)


@api_view(["GET"])
def status_list(request):
    """Справочник статусов (доступен всем)."""
    statuses = TaskStatus.objects.all().values("id", "name")
    return Response(statuses)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def change_status(request, pk: int):
    """Изменить статус задачи (только владелец)."""
    try:
        task = Task.objects.get(pk=pk, user=request.user)
    except Task.DoesNotExist:
        return Response(status.HTTP_404_NOT_FOUND)

    ser = StatusUpdateSerializer(task, data=request.data)
    ser.is_valid(raise_exception=True)
    ser.save()
    return Response(status=status.HTTP_204_NO_CONTENT)



# --- CBV Эндпоинты (классы) ---

class TaskListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.for_user(self.request.user).select_related("status", "category")

    def get_serializer_class(self):
        if self.request.method == "GET":
            return TaskReadSerializer
        return TaskSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.for_user(self.request.user).select_related("status", "category")


from rest_framework.views import APIView

class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all().values("id", "name")
        return Response(categories)
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Регистрация успешна'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

