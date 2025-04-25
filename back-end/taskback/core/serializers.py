from django.contrib.auth.models import User  

from rest_framework import serializers
from .models import Task, TaskStatus, Category

# Сериализатор для статуса задачи
class TaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskStatus
        fields = ['id', 'name']

# Сериализатор для категории задачи
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

# Сериализатор для задачи
class TaskSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    status = TaskStatusSerializer()
    category = CategorySerializer()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'due_date', 'user', 'status', 'category', 'created_at', 'updated_at']

    def create(self, validated_data):
        status_data = validated_data.pop('status')
        category_data = validated_data.pop('category', None)

        status = TaskStatus.objects.get(id=status_data['id'])
        category = Category.objects.get(id=category_data['id']) if category_data else None

        task = Task.objects.create(status=status, category=category, **validated_data)
        return task

    def update(self, instance, validated_data):
        status_data = validated_data.pop('status')
        category_data = validated_data.pop('category', None)

        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.due_date = validated_data.get('due_date', instance.due_date)

        status = TaskStatus.objects.get(id=status_data['id'])
        instance.status = status
        instance.category = Category.objects.get(id=category_data['id']) if category_data else instance.category

        instance.save()
        return instance

# Сериализатор для задачи (чтение данных с строковыми представлениями)
class TaskReadSerializer(serializers.ModelSerializer):
    status = serializers.StringRelatedField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Task
        fields = (
            "id", "title", "description", "due_date",
            "status", "category",
            "created_at", "updated_at",
        )

# Сериализатор для обновления статуса задачи
class StatusUpdateSerializer(serializers.Serializer):
    status_id = serializers.PrimaryKeyRelatedField(queryset=TaskStatus.objects.all())

    def update(self, instance, validated_data):
        instance.status = validated_data["status_id"]
        instance.save()
        return instance

    def create(self, validated_data):
        raise NotImplementedError
    

    from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email уже зарегистрирован.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user





# from rest_framework import serializers
# from .models import Task, TaskStatus, Category

# # Сериализатор для статуса задачи
# class TaskStatusSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TaskStatus
#         fields = ['id', 'name']

# # Сериализатор для категории задачи
# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = ['id', 'name']

# # Сериализатор для задачи
# class TaskSerializer(serializers.ModelSerializer):
#     user = serializers.StringRelatedField(read_only=True)
#     status = TaskStatusSerializer()
#     category = CategorySerializer()

#     class Meta:
#         model = Task
#         fields = ['id', 'title', 'description', 'due_date', 'user', 'status', 'category', 'created_at', 'updated_at']

#     def create(self, validated_data):
#         status_data = validated_data.pop('status')
#         category_data = validated_data.pop('category', None)

#         status = TaskStatus.objects.get(id=status_data['id'])
#         category = Category.objects.get(id=category_data['id']) if category_data else None

#         task = Task.objects.create(status=status, category=category, **validated_data)
#         return task

#     def update(self, instance, validated_data):
#         status_data = validated_data.pop('status')
#         category_data = validated_data.pop('category', None)

#         instance.title = validated_data.get('title', instance.title)
#         instance.description = validated_data.get('description', instance.description)
#         instance.due_date = validated_data.get('due_date', instance.due_date)

#         status = TaskStatus.objects.get(id=status_data['id'])
#         instance.status = status
#         instance.category = Category.objects.get(id=category_data['id']) if category_data else instance.category

#         instance.save()
#         return instance



# from rest_framework import serializers
# from .models import Task, TaskStatus, Category


# # 1) Полный ModelSerializer
# class TaskSerializer(serializers.ModelSerializer):
#     class Meta:
#         model  = Task
#         fields = "__all__"
#         read_only_fields = ("user",)


# # 2) ModelSerializer c вложенными именами для чтения
# class TaskReadSerializer(serializers.ModelSerializer):
#     status   = serializers.StringRelatedField()
#     category = serializers.StringRelatedField()

#     class Meta:
#         model  = Task
#         fields = (
#             "id", "title", "description", "due_date",
#             "status", "category",
#             "created_at", "updated_at",
#         )


# # 3) Чистый Serializer (не ModelSerializer) для изменения статуса
# class StatusUpdateSerializer(serializers.Serializer):
#     status_id = serializers.PrimaryKeyRelatedField(queryset=TaskStatus.objects.all())

#     def update(self, instance, validated_data):
#         instance.status = validated_data["status_id"]
#         instance.save()
#         return instance

#     def create(self, validated_data):
#         raise NotImplementedError
    

#     class CategorySerializer(serializers.ModelSerializer):
#         class Meta:
#             model = Category
#             fields = ["id", "name"]

# from django.contrib.auth.models import User
# from rest_framework import serializers

# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, min_length=6)

#     class Meta:
#         model = User
#         fields = ('username', 'email', 'password')

#     def validate_email(self, value):
#         if User.objects.filter(email=value).exists():
#             raise serializers.ValidationError("Email уже зарегистрирован.")
#         return value

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             password=validated_data['password']
#         )
#         return user


