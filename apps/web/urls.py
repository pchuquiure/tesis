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
    url('^get_pruebas$', 'get_pruebas', 
        name='get_pruebas'),    
    url('^get_pprueba$', 'get_pprueba', 
        name='get_pprueba'),
    url('^get_tipo_defecto$', 'get_tipo_defecto', 
        name='get_tipo_defecto'),    
    url('^get_dfilter$', 'get_dfilter', 
        name='get_dfilter'),  
    url('^get_ejeprueba_attach$', 'get_ejeprueba_attach', 
        name='get_ejeprueba_attach'),  
    url('^get_ejecarpeta$', 'get_ejecarpeta', 
        name='get_ejecarpeta'),  
    url('^get_ejepruebap$', 'get_ejepruebap', 
        name='get_ejepruebap'),  
    url('^get_chart_one$', 'get_chart_one', 
        name='get_chart_one'),  
    url('^get_chart_two$', 'get_chart_two', 
        name='get_chart_two'),  

    url('^guarda_peticion$', 'guarda_peticion', name='guarda_peticion'),
    url('^guarda_peticion_attach$', 'guarda_peticion_attach', 
        name='guarda_peticion_attach'),    
    url('^guarda_defecto$', 'guarda_defecto', name='guarda_defecto'),
    url('^guarda_carpeta$', 'guarda_carpeta', name='guarda_carpeta'),
    url('^guarda_prueba$', 'guarda_prueba', name='guarda_prueba'),
    url('^guarda_pprueba$', 'guarda_pprueba', 
        name='guarda_pprueba'),
    url('^guarda_ejecarpeta$', 'guarda_ejecarpeta', 
        name='guarda_ejecarpeta'),
    url('^guarda_ejeprueba$', 'guarda_ejeprueba', 
        name='guarda_ejeprueba'),
    url('^guarda_ejeprueba_attach$', 'guarda_ejeprueba_attach', 
        name='guarda_ejeprueba_attach'),
    url('^guarda_ejepruebap$', 'guarda_ejepruebap', 
        name='guarda_ejepruebap'),    

    url('^delete_peticion$', 'delete_peticion', name='delete_peticion'),
    url('^delete_defecto$', 'delete_defecto', name='delete_defecto'),
    url('^delete_carpeta$', 'delete_carpeta', name='delete_carpeta'),
    url('^delete_prueba$', 'delete_prueba', name='delete_prueba'),
    url('^delete_pprueba$', 'delete_pprueba', name='delete_pprueba'),
    url('^delete_ejecarpeta$', 'delete_ejecarpeta', name='delete_ejecarpeta'),
    url('^delete_ejeprueba$', 'delete_ejeprueba', name='delete_ejeprueba'),
    url('^delete_ejepruebap$', 'delete_ejepruebap', name='delete_ejepruebap')
    
    
)
