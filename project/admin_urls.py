# -*- coding: utf-8 -*-

from django.conf.urls.defaults import *
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^grappelli/', include('grappelli.urls')),
    # (r'^la-autentica/ubigeo/', include('ubigeo.urls')),

    # admin URLs
    url(r'^([^/]+)/([^/]+)/export_js/$', 'admin.export_js'),
    (r'', include(admin.site.urls)),
)

if settings.DEBUG:
    from django.views.static import serve
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    #urlpatterns += staticfiles_urlpatterns()
    urlpatterns += patterns('',
            url(r'^media/(?P<path>.*)$',
                serve, {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
            url(r'^static/(?P<path>.*)$',
                serve, {'document_root': settings.STATIC_ROOT, 'show_indexes': True}),
    )
