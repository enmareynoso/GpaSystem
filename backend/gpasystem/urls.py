from django.contrib import admin
from rest_framework.documentation import include_docs_urls
from django.urls import path, include

# from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("users.urls")),
    path("api/", include("accounts.urls")),
    path("docs/", include_docs_urls("GPA API")),
]
