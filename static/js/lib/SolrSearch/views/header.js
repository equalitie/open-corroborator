/*global define, Bacon, Bootstrap */
// ### header.js
// This displays the header view
// it provides:  
// > feedback on the number of actors selected
// > filtering for the search results
// > a menu to select/unselect all, create new, or update

define(
  [
    // vendor
    'jquery', 'backbone', 'handlebars',
    // streams
    'lib/streams',
    // elements
    'lib/elements/combo',
    //data
    'lib/Data/collections',
    // templates
    'lib/SolrSearch/templates/header.tpl',
    'lib/SolrSearch/templates/header-count.tpl',
    'lib/SolrSearch/templates/sort/delete-dialog.tpl',
    'lib/SolrSearch/views/sort-view',
    // translation
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function ($, Backbone, Handlebars, Streams, Combo, Collections,
    headerTmp, headerCountTmp, deleteDialogTmp, SortView, i18n
  ) {
    'use strict';
    //////////////////////////////////////////////////////////////////////
    // Stream processing functions
    //////////////////////////////////////////////////////////////////////
    var navBus = Streams.navBus,
        filterTabNav = function(value) {
          return value.type === 'navigate';
        },
        filterActions = function(value) {
          return value.type === 'action_combo';
        },
        extractResults = function(value) {
          return value.content;
        },

        getActionType = function(model) {
          return {
            option: model.get('key')
          };
        },
        // used to combine nav and action combo events
        combineBoth = function(previous, newValue) {
          if (newValue.hasOwnProperty('navValue')) {
            previous.navValue = newValue.navValue;
            previous.action = false;
          }
          if (newValue.hasOwnProperty('option')) {
            previous.option = newValue.option;
            previous.action = true;
          }
          return previous;
        },
        filterExecuteAction = function(value) {
          return value.action === true;
        },

        // map navigation event into a wrapped one
        createNavProperty = function() {
          var mapNav = function(value) {
            return { navValue: value.content.entity };
          };
          return navBus.toEventStream()
                       .map(mapNav);
        },
        // distinguish between new nav and action events
        identifyNewAction = function(previous, newValue) {
          return previous.option === newValue.option;
        };
    
    //////////////////////////////////////////////////////////////////////
    // END STREAM PROCESSING FUNCTIONS
    //////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////
    // VIEWS
    //////////////////////////////////////////////////////////////////////

    // collection of menu items for the action combo
    var menuItems = new Backbone.Collection([
      { key: 'update', name: i18n.menu.Update_selected },
      { key: 'select', name: i18n.menu.Select_all },
      { key: 'clear',  name: i18n.menu.Clear_selected }
    ]);
    if (Bootstrap.perms.can_delete_entities ===  true) {
      menuItems.add({ key: 'delete', name: i18n.menu.Delete_selected });
    }

    //////////////////////////////////////////////////////////////////////
    // ACTION COMBO VIEW
    //////////////////////////////////////////////////////////////////////
    var ActionComboView = Combo.View.extend({
      eventIdentifier: 'action_combo',
      el: '.actions',
      initialize: function(options) {
        Combo.View.prototype.initialize.call(this, options);
        this.collection = options.collection;
        this.propogateEvents();
      },

      /**
       * register a handler for navigation events
       */
      propogateEvents: function() {
        var self = this;
        var removeDeleteActions = function(value) {
          return value.option !== 'delete';
        };
        var filterDelete = function(value) {
          return value.option === 'delete';
        };

        var selectStream = Streams.searchBus.toEventStream()
                           .filter(filterActions)
                           .map(extractResults)
                           .map(getActionType);

        var both = selectStream.merge(createNavProperty());
        var watcher = both.scan({
                            type: self.eventIdentifier + '_combined'
                          }, combineBoth);

        watcher.filter(filterExecuteAction)
               .filter(removeDeleteActions)
               .onValue(function(value) {
                  Streams.searchBus.push(value);
                });

        watcher.filter(filterExecuteAction)
               .filter(filterDelete)
               .onValue(this.confirmDelete.bind(this));

      },
      // shwo a jquery ui dialog looking for confirmation before passing on
      // the delete event
      confirmDelete:function(value) {
        var dialogHtml = deleteDialogTmp({
          i18n: i18n
        });
        var $dialogHtml = $(dialogHtml);
        var buttons = {};

        buttons[i18n.sort.confirm] = function() {
          Streams.searchBus.push(value);
          $dialogHtml.dialog('close');
        };

        buttons[i18n.sort.cancel] = function() {
          $dialogHtml.dialog('close');
        };

        $dialogHtml.dialog({
          resizable: false,
          height: 140,
          modal: true,
          buttons: buttons
        });
      }

    });


    //////////////////////////////////////////////////////////////////////
    // NUMBER OF ELEMENTS SELECTED VIEW
    //////////////////////////////////////////////////////////////////////
    var ElementsSelectedView = Backbone.View.extend({
      el: '#number-selected',
      initialize: function() {
        this.collections = {
          'actor': Collections.ActorCollection,
          'bulletin': Collections.BulletinCollection,
          'incident': Collections.IncidentCollection
        };
        this.watchNav();
      },
      watchNav: function() {
        createNavProperty().onValue(this.updateSelectedView.bind(this));
                           
      },

      // change the section we are watching
      updateSelectedView: function(value) {
        this.collection = this.collections[value.navValue];
        this.collection.on('reset change remove destroy updateSelected', this.render, this);
        this.collectionName = value.navValue;
        this.render();
      },

      render: function() {
        var numItems = 
          this.collection.filter(function(model) {
            return model.get('checked') === 'checked';
          }).length;
        var html = headerCountTmp({
          i18n: i18n,
          entity: this.collectionName,
          numItems: numItems
        });
        this.$el.empty()
                .append(html);

        return this;
      }

    });


    // ## used to render the header container view
    // renders the ElementsSelectedView and the ActionComboView subviews
    var HeaderView = Backbone.View.extend({
      el: '.search-header',
      eventIdentifier: 'header_view',

      initialize: function(options) {
        this.comboView = new ActionComboView({
          collection: menuItems,
          bus: Streams.searchBus,
          primary: {
            name: i18n.header.actions,
            search_request: 'none'
          }
        });
        this.on('sortEvent', this.publishSort, this);
        this.render();
        this.renderSortBox();
      },


      render: function() {
        var header = headerTmp({
          i18n: i18n,
          domain: 'incidents'
        });
        this.$el.append(header);
        this.renderSelectedCount();
        this.renderComboBox();
      },
      //render the number selected box
      renderSelectedCount: function() {
        var countView = new ElementsSelectedView({
        });
      },
      // render the actions
      renderComboBox: function() {
        // needed because actions div has just been rendered
        this.comboView.setElement('.actions');
        this.comboView.render();
      },
      renderSortBox: function() {
        var sortView = new SortView();
      }
    });


    // expose our view as a module export
    return {
      HeaderView: HeaderView
    };
});
