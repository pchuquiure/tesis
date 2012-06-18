# -*- coding: utf-8 -*-
from django.conf.urls.defaults import patterns
from surlex.dj import surl as url

urlpatterns = patterns('web.views',
    url('^$', 'home', name='home'),
    url('^get_canal$', 'get_canal', name='get_canal'),
    url('^get_aplicativo$', 'get_aplicativo', name='get_aplicativo'),
    url('^get_usuario$', 'get_usuario', name='get_usuario'),
    url('^get_peticion$', 'get_peticion', name='get_peticion'),
    url('^guarda_peticion$', 'guarda_peticion', name='guarda_peticion')    
)
