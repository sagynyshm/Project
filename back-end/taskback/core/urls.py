


from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from rest_framework.routers import DefaultRouter
from .views import RegisterAPIView


urlpatterns = [
    # JWT auth
    path("login/",  TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(),   name="token_refresh"),

    # Task CRUD
    path("tasks/",           views.TaskListCreateView.as_view(),            name="tasks"),
    path("tasks/<int:pk>/",  views.TaskRetrieveUpdateDestroyView.as_view(), name="task-detail"),

    # Extra FBV‑эндоинты
    path("statuses/",            views.status_list,   name="status-list"),
    path("tasks/<int:pk>/status/", views.change_status, name="task-change-status"),
    path("categories/", views.CategoryListView.as_view(), name="category-list"),
    path('register/', RegisterAPIView.as_view(), name='register'),
]

