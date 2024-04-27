from django.db import models
# Create your models here.

# TIME_SLOTS = (
#     ('8:00 - 8:50' , '8:00 - 8:50'), 
#     ('8:50 - 9:40' , '8:50 - 9:40'),
#     ('9:40 - 10:30', '9:40 - 10:30'), 
#     ('10:45 - 11:30' , '10:45 - 11:30'),
#     ('12:05 - 12:50', '12:05 - 12:50'), 
#     ('12:50 - 1:35' , '12:50 - 1:35'),
#     ('1:45 - 2:30' , '1:45 - 2:30'), 
#     ('2:30 - 3:15' , '2:30 - 3:15 '),
# )

# DAYS_OF_WEEK = (
#     ('Monday', 'Monday'),
#     ('Tuesday', 'Tuesday'),
#     ('Wednesday', 'Wednesday'),
#     ('Thursday', 'Thursday'),
#     ('Friday', 'Friday'),
# )
#     # ('Saturday', 'Saturday'),

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
    course_code = models.CharField(max_length=10, blank=True)
    course_name = models.CharField(max_length=100)

    # Add more fields as needed

    def __str__(self):
        return self.course_name

class Classroom(models.Model):
    room_number = models.CharField(max_length=10, blank=True)
    seating_capacity = models.IntegerField(default=0)
    # Add more fields as needed

    def __str__(self):
        return self.room_number

class Class(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=50)

class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    
