from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status 
from .models import Task, TaskStatus
from .serializers import StatusUpdateSerializer


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