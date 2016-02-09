from dev import *

DEBUG_TOOLBAR_PATCH_SETTINGS = False 
DEBUG_TOOLBAR_CONFIG = {}

DATABASES['default']['NAME'] = 'corroborator_vm'

STATIC_ROOT = '/var/local/sites/open-corroborator-vm.stage.isotoma.com/var/static/'

CHECKOUT_ROOT = '/var/local/checkouts/open-corroborator-vm.stage.isotoma.com/'
STATICFILES_DIRS = (
    ('stylesheets', os.path.join(CHECKOUT_ROOT, 'static/stylesheets')),
    ('js', os.path.join(CHECKOUT_ROOT, 'static/js')),
    ('images', os.path.join(CHECKOUT_ROOT, 'static/images')),
    ('fonts', os.path.join(CHECKOUT_ROOT, 'static/fonts')),
    ('css', os.path.join(CHECKOUT_ROOT, 'static/css')),
    
    ('admin', os.path.join(CHECKOUT_ROOT, 'static/admin')),
)

