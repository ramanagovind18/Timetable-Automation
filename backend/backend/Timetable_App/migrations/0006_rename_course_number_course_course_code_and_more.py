# Generated by Django 5.0.3 on 2024-03-30 16:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Timetable_App', '0005_class'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='course_number',
            new_name='course_code',
        ),
        migrations.RemoveField(
            model_name='course',
            name='instructors',
        ),
    ]
