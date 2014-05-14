module.exports = function() {
  var rootDir = 'lib/data-entry/templates/',
      templates = {};

  templates[rootDir + 'bulletin-form.tpl.js'] =
    rootDir + 'bulletin-form.tpl';
  templates[rootDir + 'actor-form.tpl.js'] =
    rootDir + 'actor-form.tpl';
    
  templates[rootDir + 'actor-list-item.tpl.js'] =
    rootDir + 'actor-list-item.tpl';

  templates[rootDir + 'bulletin-list-item.tpl.js'] =
    rootDir + 'bulletin-list-item.tpl';

  templates[rootDir + 'actor-list-container.tpl.js'] =
    rootDir + 'actor-list-container.tpl';

  templates[rootDir + 'bulletin-list-container.tpl.js'] =
    rootDir + 'bulletin-list-container.tpl';


  return templates;
};
