from django.contrib import admin
from rest_framework.documentation import include_docs_urls
from django.urls import path
from .views import Register, Login, UserView, Logout

urlpatterns = [
    path("register", Register.as_view()),
    path("login", Login.as_view()),
    path('user', UserView.as_view()),
    path('logout', Logout.as_view()),
]