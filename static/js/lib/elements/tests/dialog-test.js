/*global define*/
/**
 * Tests for our main module
 * tests that events are being dispatched as we would expect
 * these are integration tests
 */
define(
  [
    'backbone',
    'lib/dispatcher'
  ],
  function(Backbone, TabRouter, dispatcher) {
    buster.testCase('Router testing', {
      setUp: function() {
      },

      tearDown: function() {
        Backbone.history.stop();
      }

    });
  }
);

