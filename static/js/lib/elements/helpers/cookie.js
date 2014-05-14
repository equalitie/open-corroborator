/*global define, document*/
// Author: Cormac McGuire
// ### Description
// Get the django csrf cookie, used in the media upload form

define (
  [
    'jquery'
  ],
  function ($) {
    'use strict';
    function getCookie(name) {
    var cookieValue = null,
        i = 0;

    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  var cookie = getCookie('csrftoken');

  return cookie;
  
});


