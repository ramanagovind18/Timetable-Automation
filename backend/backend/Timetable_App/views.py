from rest_framework import viewsets
from .models import Room, Instructor, MeetingTime, Course, Department, Section
from .serializers import RoomSerializer, InstructorSerializer, MeetingTimeSerializer, CourseSerializer, DepartmentSerializer, SectionSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class MeetingTimeViewSet(viewsets.ModelViewSet):
    queryset = MeetingTime.objects.all()
    serializer_class = MeetingTimeSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
