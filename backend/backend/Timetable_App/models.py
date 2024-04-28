from django.db import models
# Create your models here.
from django.db import models


class Instructor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    department = models.CharField(max_length=100, blank=True)


    def __str__(self):
        return self.name
    
class Course(models.Model):
    course_code = models.CharField(max_length=10, blank=True)
    course_name = models.CharField(max_length=100)

    def __str__(self):
        return self.course_name

class Classroom(models.Model):
    room_number = models.CharField(max_length=10, blank=True)
    seating_capacity = models.IntegerField(default=0)


    def __str__(self):
        return self.room_number

class Class(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.IntegerField(default=0)

    def __str__(self):
        return self.name


# class Role(models.Model):
#     name = models.CharField(max_length=50)

# class User(models.Model):
#     username = models.CharField(max_length=50)
#     password = models.CharField(max_length=100)
#     role = models.ForeignKey(Role, on_delete=models.CASCADE)
    
class TimetableEntry(models.Model):
    day = models.IntegerField()
    period = models.IntegerField()
    class_field = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)