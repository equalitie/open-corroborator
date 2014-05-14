//
// Author: Cormac McGuire  
// language.js  
// Provide functionality to toggle language
//
define(
  [
    'jquery'
  ],
  function($) {
    // array of possible languages
    var languages = ['en', 'ar'];

    var toggleLanguageDiv = function(lang, i18nElement, elType) {
      var requestedLang = lang,
          remainingLanguages = _.reject(languages, function(lang) {
            return lang === requestedLang;
          }),
          langSelector = _.reduce(remainingLanguages, function(memo, lang) {
            return memo + elType + ':lang(' + lang + ')';
          }, '');

        //
        // the .toggle show is kind of gross but there seems to be a bug
        // whereby the span:lang(<lang>) seems to select the .toggle selector too
        //
        i18nElement.children(elType + ':lang(' + requestedLang + ')')
                   .show()
                   .siblings(langSelector)
                   .hide()
                   .siblings('.toggle').show();
    };

    // toggle the language of the html based on the structure of the html
    // provided
    var toggleLanguage = function(clickedElement, i18nElement) {
      toggleLanguageDiv(clickedElement.lang, i18nElement, 'div');
      toggleLanguageDiv(clickedElement.lang, i18nElement, 'span');
    };

    // dom event handlers

    return {
      toggleLanguage: toggleLanguage
    };

});
