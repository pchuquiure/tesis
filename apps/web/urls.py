# -*- coding: utf-8 -*-
from django.conf.urls.defaults import patterns
from surlex.dj import surl as url

urlpatterns = patterns('web.views',
    url('^$', 'home', name='home'),
    url('^login$', 'login', name='blabla'),    
)
