
from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=40, unique=True)

    def __str__(self):
        return self.name


class TaskStatus(models.Model):
    name = models.CharField(max_length=20, unique=True)

    class Meta:
        verbose_name_plural = "task statuses"

    def __str__(self):
        return self.name


class TaskQuerySet(models.QuerySet):
    def for_user(self, user):
        return self.filter(user=user)


class Task(models.Model):
    title       = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    due_date    = models.DateField(null=True, blank=True)

    # FK‑отношения
    user       = models.ForeignKey(User,       on_delete=models.CASCADE, related_name="tasks")
    status     = models.ForeignKey(TaskStatus, on_delete=models.PROTECT, related_name="tasks")
    category   = models.ForeignKey(Category,   on_delete=models.SET_NULL, null=True, blank=True, related_name="tasks")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = TaskQuerySet.as_manager()   # ➜ кастомный менеджер

    def __str__(self):
        return f"{self.title} [{self.status}]"
