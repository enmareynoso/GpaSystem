# accounts/urls.py
from django.urls import path
from .views import CreateAccountView, ListAccountsView

urlpatterns = [
    path("create-account/", CreateAccountView.as_view(), name='create-account'),
    path("list-accounts/", ListAccountsView.as_view(), name='list-accounts'),
]