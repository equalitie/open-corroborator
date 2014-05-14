/*global runs, waitsFor, jasmine, describe, beforeEach, xit, it, expect */
/**
 * Test that our router works as expected
 */
define(
  [
    'lib/Navigation/TabRouter',
    'lib/streams'
  ],
  function(TabRouter, Streams) {
    var bus = Streams.navBus;
    describe('Router Testing', function () {
      var value, flag;
    
      beforeEach(function() {
        this.tabRouter = TabRouter.init();
      });
    

      it('it should return an init function', function() {
        expect(typeof(TabRouter.init)).toEqual('function');
      });

      it('it should dispatch a navigate event when a link is clicked', function(done) {
        runs(function() {
          value = 0;
          bus.toEventStream().take(1).onValue(function (value) {
            flag=true;
          });
          this.tabRouter.navigate('tab/incident', {trigger: true});
        });
        waitsFor(function() {
          value++;
          return flag;
        },'The value should be incremented');
        runs(function() {
          expect(value).toBeGreaterThan(0);
        });
      });

      it('should dispatch an event that triggers a saved search', function(){
          
      });
   });
  }
);
