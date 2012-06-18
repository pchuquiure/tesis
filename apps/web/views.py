# -*- coding: utf-8 -*-
from models import *
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect

try:
    import simplejson as json
except ImportError:
    import json

def home(request):
	context = {}
	return render(request, "home.html", context)

def get_canal(request):
    json_str = []
    canales = Canal.objects.all()
    for canal in canales:
        json_str.append({
            'label': canal.nombre,
            'id': canal.pk
        })
    json_obj = json.dumps(json_str, sort_keys=True, indent=4)
    response = HttpResponse(json_obj, mimetype="application/json")    
    return response

def get_aplicativo(request):
    json_str = []
    aplicativos = Aplicativo.objects.all()
    for aplicativo in aplicativos:
        json_str.append({
            'label': aplicativo.nombre,
            'id': aplicativo.pk
        })
    json_obj = json.dumps(json_str, sort_keys=True, indent=4)
    response = HttpResponse(json_obj, mimetype="application/json")    
    return response

def get_usuario(request):
    json_str = []
    usuarios = Usuario.objects.all()
    for usuario in usuarios:
        json_str.append({
            'label': u'%s %s' % (usuario.persona.nombre,
                usuario.persona.apellidos),
            'id': usuario.pk
        })
    json_obj = json.dumps(json_str, sort_keys=True, indent=4)
    response = HttpResponse(json_obj, mimetype="application/json")    
    return response

def get_peticion(request):
    json_str = []
    peticiones = Peticion.objects.all()
    for peticion in peticiones:        
        json_str.append({
            'id': peticion.pk,
            'nombre': peticion.nombre,
            'descripcion': peticion.descripcion,
            'fecha_creacion': str(peticion.fechaCreacion),
            'estado': peticion.estado,
            'imagen': peticion.imagen.name,
            'aplicativo': {
                'id':peticion.aplicativo.pk,
                'label':peticion.aplicativo.nombre
            },
            'canal': {
                'id':peticion.canal.pk,
                'label':peticion.canal.nombre
            },
            'usuario': {
                'id':peticion.usuario.pk,
                'label':u'%s %s' % (peticion.usuario.persona.nombre,
                peticion.usuario.persona.apellidos),
            }
        })
    json_obj = json.dumps(json_str, sort_keys=True, indent=4)
    response = HttpResponse(json_obj, mimetype="application/json")    
    return response

@csrf_exempt
def guarda_peticion(request):
    if request.method.lower() == "post":
        result = {'success':'true'}        
        canal = request.POST.get('canal', None)
        aplicativo = request.POST.get('aplicativo', None)
        usuario = request.POST.get('usuario', None)
        estado = request.POST.get('estado', None)
        descripcion = request.POST.get('descripcion', None)
        nombre = request.POST.get('nombre', None)
        imagen = request.FILES['imagen']

        try:
            peticion = Peticion()
            peticion.canal_id = canal
            peticion.usuario_id = usuario
            peticion.aplicativo_id = aplicativo
            peticion.estado = estado
            peticion.descripcion = descripcion
            peticion.nombre = nombre
            peticion.imagen = imagen
            peticion.save()
        except Exception as e:
            print e
            result = {'success':'false'}

        json_obj = json.dumps(result, indent=4)
        response = HttpResponse(json_obj, mimetype='text/html') 
        return response