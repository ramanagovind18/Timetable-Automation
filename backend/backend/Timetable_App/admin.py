from django.contrib import admin
from .models import Classroom, Instructor, Course
# MeetingTime,Department, Section
# Register your models here.

admin.site.register(Classroom)
admin.site.register(Instructor)
admin.site.register(Course)
# admin.site.register(MeetingTime)
# admin.site.register(Department)
# admin.site.register(Section)