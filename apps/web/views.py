# -*- coding: utf-8 -*-
from django.shortcuts import render

def home(request):
	context = {}
	return render(request, "home.html", context)

def login(request):
	context = {}
	return render(request, "login.html", context)
