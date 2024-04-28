from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from Timetable_App.views import InstructorViewSet, CourseViewSet, ClassroomViewSet, ClassViewSet, TimetableEntryViewSet
from Timetable_App import views

router = routers.DefaultRouter()
router.register(r'instructors', InstructorViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'classrooms', ClassroomViewSet)
router.register(r'classes', ClassViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/save_timetable/', views.save_timetable, name='save_timetable_data'),
]
