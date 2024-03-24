from rest_framework import serializers
from .models import Classroom, Instructor, Course
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role']
# , Timetable
# MeetingTime, Department, Section

# class TimetableSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Timetable
#         fields = '__all__'

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '__all__'


# class RoomSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Room
#         fields = '__all__'

# class InstructorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Instructor
#         fields = '__all__'

# class TimetableSerializer(serializers.Serializer):
#     timetable = serializers.DictField()
# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = '__all__'

# class MeetingTimeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MeetingTime
#         fields = '__all__'


# class DepartmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Department
#         fields = '__all__'

# class SectionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Section
#         fields = '__all__'
