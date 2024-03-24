from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from Timetable_App.views import InstructorViewSet, CourseViewSet, ClassroomViewSet
# , TimetableViewSet 
# from Timetable_App.views import generate_timetables

router = routers.DefaultRouter()
router.register(r'instructors', InstructorViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'classrooms', ClassroomViewSet)
# router.register(r'timetables', TimetableViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),
    # path('api/generate-timetables/', generate_timetables, name='generate_timetables'),
]

# from django.contrib import admin
# from django.urls import path, include
# from rest_framework import routers
# from Timetable_App import views

# # Create a router instance
# router = routers.DefaultRouter()

# # Register view sets with the router
# router.register(r'rooms', views.RoomViewSet, basename='room')
# router.register(r'instructors', views.InstructorViewSet, basename='instructor')
# router.register(r'courses', views.CourseViewSet, basename='course')

# # router.register(r'meetingtimes', views.MeetingTimeViewSet, basename='meetingtime')
# # router.register(r'departments', views.DepartmentViewSet, basename='department')
# # router.register(r'sections', views.SectionViewSet, basename='section')

# # Define URL patterns
# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include(router.urls)),
# ]
