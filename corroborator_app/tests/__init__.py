#api tests
from corroborator_app.tests.api.ActorApiTest import *
from corroborator_app.tests.api.ActorRelationshipApiTest import *
from corroborator_app.tests.api.LabelApiTest import *
from corroborator_app.tests.api.CommentApiTest import CommentTestCase
#from corroborator_app.tests.api.MediaApiTest import *
from corroborator_app.tests.api.PredefinedSearchApiTest import *
from corroborator_app.tests.api.SourceApiTest import *
from corroborator_app.tests.api.SourceTypeApiTest import *
from corroborator_app.tests.api.StatusUpdateApiTest import *
from corroborator_app.tests.api.TimeInfoApiTest import *
from corroborator_app.tests.api.ActorRoleApiTest import *
from corroborator_app.tests.api.LocationApiTest import *
from corroborator_app.tests.api.BulletinApiTest import *
from corroborator_app.tests.api.IncidentApiTest import *
from corroborator_app.tests.api.MonitorUpdateApiTest import (
    MonitorUpdateTestCase
)

# model tests
from corroborator_app.tests.models.StatusUpdateModelTest import\
    StatusUpdateModelTestCase
from corroborator_app.tests.models.ActorBootstrapTest import\
    ActorBootstrapTestCase
from corroborator_app.tests.models.BulletinBootstrapTest import\
    BulletinBootstrapTestCase
from corroborator_app.tests.monitor.MonitorDataLoaderTest import *

# view tests
from corroborator_app.tests.views.AppViewTest import AppViewTestCase
from corroborator_app.tests.views.reporting_view_test import(
    ReportingTestCase
)
from corroborator_app.tests.views.views_util_tests import(
    ViewsUtilsTestCase
)

from corroborator_app.tests.authproxy.AWSProxyTest import *
from corroborator_app.tests.authproxy.SolrProxyTest import *

from corroborator_app.tests.multisave.test_multisave_actor import\
    MultiSaveActorTestCase
from corroborator_app.tests.multisave.test_multisave_bulletin import\
    MultiSaveBulletinTestCase
from corroborator_app.tests.multisave.test_multisave_incident import\
    MultiSaveIncidentTestCase
from corroborator_app.tests.utilities.test_thumbnailer import\
    ThumbnailerTestCase, FFMPEGTestCase
