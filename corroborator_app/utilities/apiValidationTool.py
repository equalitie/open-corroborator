"""
Author: Bill Doran
Date: 26-09-2013
This class validates api objects to ensure that they contain the correct
field values as described by their models
"""

from tastypie.validation import Validation
from django.core.exceptions import ValidationError

class ApiValidation(Validation):
    def is_valid(self, bundle, request=None):
        if not bundle.data:
            return {'__all__': 'Request did not include required data'}

        try:
            bundle.obj.full_clean()
        except ValidationError as e:
            return e
           
        return {}   




