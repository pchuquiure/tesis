# -*- coding: utf-8 -*-
from django.utils.translation import ugettext_lazy as _

from grappelli.dashboard import modules, Dashboard
from grappelli.dashboard.utils import get_admin_site_name


class CustomIndexDashboard(Dashboard):
    """
    Custom index dashboard for www.
    """
    def init_with_context(self, context):
        site_name = get_admin_site_name(context)
        self.children.append(modules.ModelList(
            _(u'Test.'),
            column=1,
            collapsible=False,
            models=('web.models.*',),
        ))        
