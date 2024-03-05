from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from Timetable_App import views

# Create a router instance
router = routers.DefaultRouter()

# Register view sets with the router
router.register(r'rooms', views.RoomViewSet, basename='room')
router.register(r'instructors', views.InstructorViewSet, basename='instructor')
router.register(r'meetingtimes', views.MeetingTimeViewSet, basename='meetingtime')
router.register(r'courses', views.CourseViewSet, basename='course')
router.register(r'departments', views.DepartmentViewSet, basename='department')
router.register(r'sections', views.SectionViewSet, basename='section')

# Define URL patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
