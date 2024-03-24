from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save, post_delete

# Create your models here.

TIME_SLOTS = (
    ('8:00 - 8:50' , '8:00 - 8:50'), 
    ('8:50 - 9:40' , '8:50 - 9:40'),
    ('9:40 - 10:30', '9:40 - 10:30'), 
    ('10:45 - 11:30' , '10:45 - 11:30'),
    ('12:05 - 12:50', '12:05 - 12:50'), 
    ('12:50 - 1:35' , '12:50 - 1:35'),
    ('1:45 - 2:30' , '1:45 - 2:30'), 
    ('2:30 - 3:15' , '2:30 - 3:15 '),
)

DAYS_OF_WEEK = (
    ('Monday', 'Monday'),
    ('Tuesday', 'Tuesday'),
    ('Wednesday', 'Wednesday'),
    ('Thursday', 'Thursday'),
    ('Friday', 'Friday'),
)
    # ('Saturday', 'Saturday'),

from django.db import models


class Instructor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    department = models.CharField(max_length=100, blank=True)
    # Add more fields as needed

    def __str__(self):
        return self.name
    

class Course(models.Model):
    course_number = models.CharField(max_length=10, primary_key=True)
    course_name = models.CharField(max_length=100)
    instructors = models.ManyToManyField(Instructor)

    # Add more fields as needed

    def __str__(self):
        return self.course_name

class Classroom(models.Model):
    room_number = models.CharField(max_length=10, primary_key=True)
    seating_capacity = models.IntegerField(default=0)
    # Add more fields as needed

    def __str__(self):
        return self.room_number

class Role(models.Model):
    name = models.CharField(max_length=50)

class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    
# class Timetable(models.Model):
#     day = models.CharField(max_length=10, choices=DAYS_OF_WEEK)
#     start_time = models.CharField(max_length=20, choices=TIME_SLOTS)
#     end_time = models.CharField(max_length=20, choices=TIME_SLOTS)
#     course = models.CharField(max_length=100)
#     instructor = models.CharField(max_length=100)
#     room = models.CharField(max_length=100)

#     def __str__(self):
#         return f'{self.day} - {self.start_time} to {self.end_time}: {self.course} with {self.instructor} in {self.room}'

# class Timetable(models.Model):
#     classroom = models.CharField(max_length=50)
#     timetable_data = models.JSONField()

#     def __str__(self):
#         return f'Timetable for {self.classroom}'

# class Room(models.Model):
#     Room_number = models.CharField(max_length=6)
#     seating_capacity = models.IntegerField(default=0)

#     def __str__(self):
#         return self.Room_number


# class Instructor(models.Model):
#     uid = models.CharField(max_length=6)
#     name = models.CharField(max_length=25)

#     def __str__(self):
#         return f'{self.uid} {self.name}'

# class Course(models.Model):
#     course_number = models.CharField(max_length=5, primary_key=True)
#     course_name = models.CharField(max_length=40)
#     max_numb_students = models.CharField(max_length=65)
#     instructors = models.ManyToManyField(Instructor)

#     def __str__(self):
#         return f'{self.course_number} {self.course_name}'


# class MeetingTime(models.Model):
#     pid = models.CharField(max_length=4, primary_key=True)
#     time = models.CharField(max_length=50,
#                             choices=TIME_SLOTS,
#                             default='11:30 - 12:30')
#     day = models.CharField(max_length=15, choices=DAYS_OF_WEEK)

#     def __str__(self):
#         return f'{self.pid} {self.day} {self.time}'

# class Department(models.Model):
#     dept_name = models.CharField(max_length=50)
#     courses = models.ManyToManyField(Course)

#     @property
#     def get_courses(self):
#         return self.courses

#     def __str__(self):
#         return self.dept_name


# class Section(models.Model):
#     section_id = models.CharField(max_length=25, primary_key=True)
#     department = models.ForeignKey(Department, on_delete=models.CASCADE)
#     num_class_in_week = models.IntegerField(default=0)
#     course = models.ForeignKey(Course,
#                                on_delete=models.CASCADE,
#                                blank=True,
#                                null=True)
#     meeting_time = models.ForeignKey(MeetingTime,
#                                      on_delete=models.CASCADE,
#                                      blank=True,
#                                      null=True)
#     room = models.ForeignKey(Room,
#                              on_delete=models.CASCADE,
#                              blank=True,
#                              null=True)
#     instructor = models.ForeignKey(Instructor,
#                                    on_delete=models.CASCADE,
#                                    blank=True,
#                                    null=True)

#     def set_room(self, room):
#         section = Section.objects.get(pk=self.section_id)
#         section.room = room
#         section.save()

#     def set_meetingTime(self, meetingTime):
#         section = Section.objects.get(pk=self.section_id)
#         section.meeting_time = meetingTime
#         section.save()

#     def set_instructor(self, instructor):
#         section = Section.objects.get(pk=self.section_id)
#         section.instructor = instructor
#         section.save()