from django.contrib import admin
from .models import Classroom, Instructor, Course, Class


admin.site.register(Classroom)
admin.site.register(Instructor)
admin.site.register(Course)
admin.site.register(Class)
