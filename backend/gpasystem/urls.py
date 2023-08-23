from django.contrib import admin
from rest_framework.documentation import include_docs_urls
from django.urls import path, include

# from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    # path('accounts/', views.accounts_view, name='accounts'),
    # path('transactions/', views.transactions_view, name='transactions'),
    path("api/", include("users.urls")),
    path('docs/', include_docs_urls("GPA API"))
]