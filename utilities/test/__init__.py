from django.test import TestCase
from django.test.client import RequestFactory

class CBVTestCase(TestCase):
    """
    Utility class for testing class based views
    adds methods for:
    - setting up the view
    - creating the request
    - attaching a user to the request
    - dispatching the request
    """
    
    url = '/'
    
    def setUp(self):
        self.request = self.create_request()

    def setup_view(self, view, request, *args, **kwargs):
        """
        Mimic as_view() returned callable, but returns view instance.
        args and kwargs are the same you would pass to ``reverse()``
        """
        view = self.view
        view.request = request
        view.args = args
        view.kwargs = kwargs
        self.view = view
        return view

    def create_request(self):
        factory = RequestFactory()
        request = factory.get(self.url)
        return request

    def dispatch_request(self, request):
        self.view = self.setup_view(self.view, request)
        response = self.view.dispatch(
            self.view.request, *self.view.args, **self.view.kwargs)
        return response

    def create_user(self):
        user = User.objects.create_user('john',
                                        'lennon@thebeatles.com',
                                        'johnpassword')
        g = Group.objects.get(name='candidates')
        g.user_set.add(user)
        user.save()
        self.user = user
        return user
