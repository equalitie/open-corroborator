/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// display an embedded search result for an actor

define (
  [
    'jquery', 'backbone',
    'lib/streams',
    'lib/CRUD/templates/search-templates/actor/actor-result.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, Backbone, Streams, actorResultTmp, i18n) {
    'use strict';

    var ActorResultView,
        crudBus = Streams.crudBus,
        roleMap = {
          role_status: Bootstrap.gl_ac_role_list,
          relation_status: Bootstrap.gl_ac_relation_list
        };

    // ### ActorResultView
    // 
    ActorResultView = Backbone.View.extend({
      template: actorResultTmp,
      tagName: 'li',
      className: 'embedded-actor-result',
      events: {
        'click .actions.search-result li .text': 'relateToEntity',
        'click .when-related li .text': 'updateRelationship',
        'click .do-removeActor': 'removeActor'
      },
      // constructor
      initialize: function(options) {
        this.addi18n();
        if (options.type === undefined) {
          throw "You must specify a type";
        }
        if (options.actorRoleModel) {
          this.actorRoleModel = options.actorRoleModel;
        }
        this.fieldName = options.fieldName;
        this.type = options.type;
        this.listenTo(this.model, 'sync', this.render.bind(this));
        this.render();
        this.selectInitialLanguage();
      },
      // send a message asking to relate this actor to the current  
      // entity being edited
      relateToEntity: function(evt) {
        this.collection.remove(this.model);
        crudBus.push({
          type: 'relate_actor_request',
          content: {
            relationship: $(evt.currentTarget).text(),
            relationship_key: $(evt.currentTarget).data('role'),
            model: this.model
          }
        });
      },

      // update the role of this actor
      updateRelationship: function(evt) {
        evt.preventDefault();
        crudBus.push({
          type: 'update_actor_relationship_request',
          content: {
            relationship: $(evt.currentTarget).text(),
            relationship_key: $(evt.currentTarget).data('role'),
            model: this.actorRoleModel
          }
        });
      },

      // remove the actor from the current entity
      removeActor: function(evt) {
        evt.preventDefault();
        this.collection.remove(this.model);
        crudBus.push({
          type: 'unrelate_actor_request',
          content: {
            model: this.model
          }
        });
      },

      // unsubscribe from dom events and remove the element
      resetFlags: function() {
        this.model.unset('selected');
        this.model.unset('result');
      },

      // render the template
      render: function() {
        this.resetFlags();
        this.model.set(this.type, true);
        var templateVars = {
          i18n: i18n,
          model: this.model.toJSON(),
          roles: roleMap[this.fieldName],
          fieldName: this.fieldName
        };
        if (this.actorRoleModel !== undefined) {
          templateVars.roleModel = this.actorRoleModel.toJSON();
        }
        var html = this.template(templateVars);
        this.$el.empty().append(html);
      }
    });

    return ActorResultView;
    
});
