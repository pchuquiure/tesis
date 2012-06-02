# -*- coding: utf-8 -*-
from settings import *

INSTALLED_APPS = BASE_INSTALLED_APPS + (
	'grappelli.dashboard',
	'grappelli',
    'django.contrib.admin',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.request',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.contrib.messages.context_processors.messages',
    )


GRAPPELLI_ADMIN_TITLE = 'CMS - TEST'
GRAPPELLI_INDEX_DASHBOARD = 'project.dashboard.CustomIndexDashboard'

ROOT_URLCONF = 'admin_urls'
SITE_ID = 1
