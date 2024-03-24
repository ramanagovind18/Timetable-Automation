from rest_framework import viewsets
from .models import Instructor, Course, Classroom
# , Timetable
from .serializers import InstructorSerializer, CourseSerializer, ClassroomSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import User
from .serializers import UserSerializer

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)
        return Response({'message': 'Login successful', 'user': serializer.data})
    else:
        return Response({'message': 'Login failed'}, status=401)

@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logout successful'})
# , TimetableSerializer
# from django.http import JsonResponse
# from .timetable_generator import GeneticAlgorithm
# from .models import Course, Instructor
# Timetable,

# TIME_SLOTS = (
#     ('8:00 - 8:50'  , '8:50 - 9:40'),
#     ('9:40 - 10:30', '10:45 - 11:30'),
#     ('12:05 - 12:50', '12:50 - 1:35'),
#     ('1:45 - 2:30'  , '2:30 - 3:15 '),
# )

# def generate_timetables(request):
#     # Define the parameters for the genetic algorithm
#     num_classrooms = 5
#     time_slots = TIME_SLOTS
#     instructors = list(Instructor.objects.all())
#     courses = list(Course.objects.all())

#     # Instantiate the GeneticAlgorithm class
#     ga = GeneticAlgorithm(num_classrooms, time_slots, instructors, courses)

#     # Generate the timetables
#     generated_timetables = ga.generate_timetables(generations=100, num_timetables=5)

#     # Save the generated timetables to the database
#     for i, timetable in enumerate(generated_timetables, start=1):
#         timetable_obj = Timetable.objects.create(index=i)
#         for slot, data in timetable.items():
#             for instructor, course in data:
#                 timetable_obj.schedule.create(slot=slot, instructor=instructor, course=course)

#         timetable_obj.save()

#     return JsonResponse({'message': 'Timetables generated and saved successfully.'})

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer

# class TimetableViewSet(viewsets.ModelViewSet):
#     queryset = Timetable.objects.all()
#     serializer_class = TimetableSerializer

# from rest_framework import viewsets
# from .models import Room, Instructor, Course,Timetable
# # MeetingTime, Department, Section
# from .serializers import RoomSerializer, InstructorSerializer,CourseSerializer 
# # MeetingTimeSerializer, DepartmentSerializer, SectionSerializer
# # views.py
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .timetable_generator import TimetableGenerator
# from .models import Timetable
# from .serializers import TimetableSerializer

# class GenerateTimetablesView(APIView):
#     def post(self, request):
#         num_classrooms = int(request.data.get('num_classrooms'))
#         num_timetables = int(request.data.get('num_timetables'))
#         generations = int(request.data.get('generations'))

#         for i in range(1, num_classrooms+1):
#             classroom_name = f'Classroom {i}'
#             generator = TimetableGenerator(population_size=100, classroom=classroom_name)
#             timetable_data = generator.generate_timetable(generations)
#             timetable = Timetable(classroom=classroom_name, timetable_data=timetable_data)
#             timetable.save()

#         return Response({'message': 'Timetables generated and saved successfully'})


# class RoomViewSet(viewsets.ModelViewSet):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer

# class InstructorViewSet(viewsets.ModelViewSet):
#     queryset = Instructor.objects.all()
#     serializer_class = InstructorSerializer

# class CourseViewSet(viewsets.ModelViewSet):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializer



# class MeetingTimeViewSet(viewsets.ModelViewSet):
#     queryset = MeetingTime.objects.all()
#     serializer_class = MeetingTimeSerializer

# class DepartmentViewSet(viewsets.ModelViewSet):
#     queryset = Department.objects.all()
#     serializer_class = DepartmentSerializer

# class SectionViewSet(viewsets.ModelViewSet):
#     queryset = Section.objects.all()
#     serializer_class = SectionSerializer
