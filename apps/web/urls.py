# -*- coding: utf-8 -*-
from django.conf.urls.defaults import patterns
from surlex.dj import surl as url

urlpatterns = patterns('web.views',
    url('^$', 'home', name='home'),
    url('^get_canal$', 'get_canal', name='get_canal'),
    url('^get_aplicativo$', 'get_aplicativo', name='get_aplicativo'),
    url('^get_usuario$', 'get_usuario', name='get_usuario'),
    url('^get_peticion$', 'get_peticion', name='get_peticion'),
    url('^get_peticion_attach$', 'get_peticion_attach', 
        name='get_peticion_attach'),
    url('^get_defecto$', 'get_defecto', name='get_defecto'),
    url('^get_peticion_simple$', 'get_peticion_simple', 
        name='get_peticion_simple'),
    url('^get_carpeta$', 'get_carpeta', 
        name='get_carpeta'),
    url('^get_prueba$', 'get_prueba', 
        name='get_prueba'),
    url('^get_pprueba$', 'get_pprueba', 
        name='get_pprueba'),
    url('^get_tipo_defecto$', 'get_tipo_defecto', 
        name='get_tipo_defecto'),    
    url('^get_dfilter$', 'get_dfilter', 
        name='get_dfilter'),  

    url('^guarda_peticion$', 'guarda_peticion', name='guarda_peticion'),
    url('^guarda_peticion_attach$', 'guarda_peticion_attach', 
        name='guarda_peticion_attach'),    
    url('^guarda_defecto$', 'guarda_defecto', name='guarda_defecto'),
    url('^guarda_carpeta$', 'guarda_carpeta', name='guarda_carpeta'),
    url('^guarda_prueba$', 'guarda_prueba', name='guarda_prueba'),
    url('^guarda_pprueba$', 'guarda_pprueba', 
        name='guarda_pprueba'),

    url('^delete_peticion$', 'delete_peticion', name='delete_peticion'),
    url('^delete_defecto$', 'delete_defecto', name='delete_defecto'),
    url('^delete_carpeta$', 'delete_carpeta', name='delete_carpeta'),
    url('^delete_prueba$', 'delete_prueba', name='delete_prueba'),
    url('^delete_pprueba$', 'delete_pprueba', name='delete_pprueba')
    
    
)
