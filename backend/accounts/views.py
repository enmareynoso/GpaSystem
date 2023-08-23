from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def create_account(request):
    return HttpResponse("Hola")

def accounts_list(request):
    return HttpResponse("Hola2")

def account_details(request):
    return HttpResponse("Hola")


def create_transaction(request):
    return HttpResponse("Hola")