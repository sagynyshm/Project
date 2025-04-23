
from rest_framework import serializers
from .models import Task, TaskStatus, Category


# 1) Полный ModelSerializer
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Task
        fields = "__all__"
        read_only_fields = ("user",)


# 2) ModelSerializer c вложенными именами для чтения
class TaskReadSerializer(serializers.ModelSerializer):
    status   = serializers.StringRelatedField()
    category = serializers.StringRelatedField()

    class Meta:
        model  = Task
        fields = (
            "id", "title", "description", "due_date",
            "status", "category",
            "created_at", "updated_at",
        )


# 3) Чистый Serializer (не ModelSerializer) для изменения статуса
class StatusUpdateSerializer(serializers.Serializer):
    status_id = serializers.PrimaryKeyRelatedField(queryset=TaskStatus.objects.all())

    def update(self, instance, validated_data):
        instance.status = validated_data["status_id"]
        instance.save()
        return instance

    def create(self, validated_data):
        raise NotImplementedError
