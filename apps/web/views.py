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

def get_peticion_simple(request):
    json_str = []
    peticiones = Peticion.objects.all()
    for peticion in peticiones:
        json_str.append({
            'label': peticion.nombre,
            'id': peticion.pk
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
        try:
            image = peticion.imagen.name.split("/")[4]
        except:
            image = None
        json_str.append({
            'id': peticion.pk,
            'nombre': peticion.nombre,
            'descripcion': peticion.descripcion,
            'fecha_creacion': str(peticion.fechaCreacion),
            'estado': peticion.estado,
            'imagen': image,
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

def get_peticion_attach(request):
    json_str = []
    id = request.GET.get('id', None)
    adjuntos = Adjunto.objects.filter(peticion__pk=id)

    for adjunto in adjuntos:        
        try:
            imagen = adjunto.imagen.name.split("/")[1]
        except:
            imagen = None

        json_str.append({
            'id': adjunto.pk,
            'tamano': adjunto.tamano,
            'file': imagen,
            'fecha_creacion': str(adjunto.fechaCreacion)            
        })
    json_obj = json.dumps(json_str, sort_keys=True, indent=4)
    response = HttpResponse(json_obj, mimetype="application/json")    
    return response

@csrf_exempt
def guarda_peticion_attach(request):
    if request.method.lower() == "post":
        result = {'success':'true'}        
        id = request.POST.get('id', None)     
        imagen = request.FILES['File']

        try:
            adjunto = Adjunto()
            adjunto.peticion_id = id
            adjunto.tamano = imagen.size
            adjunto.imagen = imagen
            adjunto.save()
        except Exception as e:
            print e
            result = {'success':'false'}

        json_obj = json.dumps(result, indent=4)
        response = HttpResponse(json_obj, mimetype='text/html') 
        return response

@csrf_exempt
def guarda_peticion(request):
    if request.method.lower() == "post":
        result = {'success':'true'}
        id = request.POST.get('id', None)
        canal = request.POST.get('canal', None)
        aplicativo = request.POST.get('aplicativo', None)
        usuario = request.POST.get('usuario', None)
        estado = request.POST.get('estado', None)
        descripcion = request.POST.get('descripcion', None)
        nombre = request.POST.get('nombre', None)
        try:
            imagen = request.FILES['imagenFile']
        except:
            imagen = None

        try:
            if id:
                peticion = Peticion.objects.get(id=id)
            else:
                peticion = Peticion()                
            peticion.canal_id = canal
            peticion.usuario_id = usuario
            peticion.aplicativo_id = aplicativo
            peticion.estado = estado
            peticion.descripcion = descripcion
            peticion.nombre = nombre
            if imagen:
                peticion.imagen = imagen
            peticion.save()
        except Exception as e:
            print e           
            result = {'success':'false'}

        json_obj = json.dumps(result, indent=4)
        response = HttpResponse(json_obj, mimetype='text/html') 
        return response

@csrf_exempt
def delete_peticion(request):
    if request.method.lower() == "post":
        result = {'success':'true'}   
        id = request.POST.get('id', None)
        try:
            peticion = Peticion.objects.get(id=id)
            peticion.delete()
        except Exception as e:
            result = {'success':'false'}
        json_obj = json.dumps(result, indent=4)
        response = HttpResponse(json_obj, mimetype='text/html') 
        return response

def get_defecto(request):
    """ Defecto """
    json_str = []
    pid = request.GET.get('pid', None)
    if pid:
        defectos = Defecto.objects.filter(peticion__pk=pid)
    else:
        defectos = Defecto.objects.all()

    for defecto in defectos:
        try:
            imagen = defecto.imagen.name.split("/")[1]
        except:
            imagen = None
        json_str.append({
            'id': defecto.pk,
            'nombre': defecto.nombre,
            'resumen': defecto.resumen,
            'descripcion': defecto.descripcion,
            'fecha_creacion': str(defecto.fechaCreacion),
            'estado': defecto.estado,
            'tipo': defecto.tipo,
            'gravedad': defecto.gravedad,            
            'imagen': imagen,
            'peticion': {
                'id':defecto.peticion.pk,
                'label':u'%s' % (defecto.peticion.nombre),
            },
            'usuario': {
                'id':defecto.usuario.pk,
                'label':u'%s %s' % (defecto.usuario.persona.nombre,
                defecto.usuario.persona.apellidos),
            }
        })
    json_obj = json.dumps(json_str, sort_keys=True, indent=4)
    response = HttpResponse(json_obj, mimetype="application/json")    
    return response

@csrf_exempt
def guarda_defecto(request):
    if request.method.lower() == "post":
        result = {'success':'true'}
        id = request.POST.get('id', None)
        peticion = request.POST.get('peticion', None)        
        usuario = request.POST.get('usuario', None)
        estado = request.POST.get('estado', None)
        tipo = request.POST.get('tipo', None)
        gravedad = request.POST.get('gravedad', None)
        descripcion = request.POST.get('descripcion', None)
        resumen = request.POST.get('resumen', None)
        nombre = request.POST.get('nombre', None)

        try:
            imagen = request.FILES['imagenFile']
        except:
            imagen = None

        try:
            if id:
                defecto = Defecto.objects.get(id=id)
            else:
                defecto = Defecto()
            defecto.peticion_id = peticion
            defecto.usuario_id = usuario            
            defecto.estado = estado
            defecto.gravedad = gravedad
            defecto.tipo = tipo
            defecto.descripcion = descripcion
            defecto.resumen = resumen
            defecto.nombre = nombre
            if imagen:
                defecto.imagen = imagen
            defecto.save()
        except Exception as e:
            print e           
            result = {'success':'false'}

        json_obj = json.dumps(result, indent=4)
        response = HttpResponse(json_obj, mimetype='text/html') 
        return response

@csrf_exempt
def delete_defecto(request):
    if request.method.lower() == "post":
        result = {'success':'true'}   
        id = request.POST.get('id', None)
        try:
            defecto = Defecto.objects.get(id=id)
            defecto.delete()
        except Exception as e:
            result = {'success':'false'}
        json_obj = json.dumps(result, indent=4)
        response = HttpResponse(json_obj, mimetype='text/html') 
        return response

def get_carpeta(request):
    json_str = []    
    carpetas = Carpeta.objects.all()
    for carpeta in carpetas:
        children = []
        json_str.append({
            'children': {
                'text': carpeta.nombre,
                'id': carpeta.pk,
                'expanded': False,
                'children': children
            }
        })
        pruebas = CasoPrueba.objects.filter(carpeta=carpeta)
        for prueba in pruebas:
            children.append({
                'text': prueba.nombre,
                'id': prueba.pk,
                'expanded': False,
                'leaf': True
            })    
    json_obj = json.dumps(json_str, sort_keys=True, indent=4)
    response = HttpResponse(json_obj, mimetype="application/json")    
    return response

@csrf_exempt
def guarda_carpeta(request):
    if request.method.lower() == "post":
        result = {'success':'true'}
        id = request.POST.get('id', None)        
        nombre = request.POST.get('nombre', None)

        try:
            if id:
                carpeta = Carpeta.objects.get(id=id)
            else:
                carpeta = Carpeta()            
            carpeta.nombre = nombre            
            carpeta.save()
        except Exception as e:
            print e           
            result = {'success':'false'}

        json_obj = json.dumps(result, indent=4)
        response = HttpResponse(json_obj, mimetype='text/html') 
        return response
