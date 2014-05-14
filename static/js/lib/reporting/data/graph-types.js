/*global define*/
// Author: Cormac McGuire
// ### 
// 

define(
  ['backbone', 'i18n!lib/reporting/nls/dict'],
  function(Backbone, i18n) {
    'use strict';

    var GraphModel = Backbone.Model.extend({
          idAttribute: 'key'
        }),
        GraphTypeCollection = Backbone.Collection.extend({
          model: GraphModel
        }),

        userGraphs, actorGraphs, bulletinGraphs, incidentGraphs, allGraphs,
        selectGraphTypeFromKey = function(key) {
          return allGraphs.chain().filter(function(graphModel) {
            return graphModel.get('key') === key;
          }).first().value().get('type');
        };

    actorGraphs = new GraphTypeCollection([
      {
        key: 'age_exact',
        type: 'bar',
        title: i18n.title.actor_age,
        filter_label: i18n.filters.age,
        yAxisLabel: i18n.axes.Actors
      },
      {
        key: 'sex_exact',
        type: 'pie',
        title: i18n.title.actor_sex,
        filter_label: i18n.filters.sex
      },
      {
        key: 'actor_searchable_current_exact',
        type: 'bar',
        title: i18n.title.actor_location,
        filter_label: i18n.filters.location,
        yAxisLabel: i18n.axes.Actors
      },
      {
        key: 'actor_entity_role_exact',
        type: 'pie',
        title: i18n.title.role,
        filter_label: i18n.filters.role
      },
      {
        key: 'civilian_exact',
        type: 'pie',
        title: i18n.title.actor_civilian,
        filter_label: i18n.filters.civilian
      },
      {
        key: 'most_recent_status_actor_exact',
        type: 'pie',
        title: i18n.title.actor_status,
        filter_label: i18n.filters.status
      },
      {
        key: 'actor_created',
        type: 'trend',
        title: i18n.title.actors_in_time,
        filter_label: i18n.filters.actors_in_time,
        label: i18n.filters.actors_in_time,
        yAxisLabel: i18n.axes.Actors,
        xAxisLabel: i18n.axes.Time
      }
    ]);
    actorGraphs.each(function(aGraph) {
      aGraph.set('entity', 'actor');
    });

    bulletinGraphs = new GraphTypeCollection([
      {
        key: 'most_recent_status_bulletin_exact',
        type: 'pie',
        title: i18n.title.bulletin_status,
        filter_label: i18n.filters.status
      },
      {
        key: 'bulletin_labels_exact',
        type: 'bar',
        title: i18n.title.bulletin_labels,
        filter_label: i18n.filters.labels,
        yAxisLabel: i18n.axes.Bulletins
      },
      {
        key: 'bulletin_sources_exact',
        type: 'bar',
        title: i18n.title.bulletin_sources,
        filter_label: i18n.filters.sources,
        yAxisLabel: i18n.axes.Bulletins
      },
      {
        key: 'bulletin_type_exact',
        type: 'pie',
        title: i18n.title.bulletin_type,
        filter_label: i18n.filters.type
      },
      {
        key: 'bulletin_searchable_locations_exact',
        type: 'bar',
        title: i18n.title.bulletin_location,
        filter_label: i18n.filters.location,
        yAxisLabel: i18n.axes.Bulletins
      },
      {
        key: 'bulletin_created_date',
        type: 'trend',
        title: i18n.title.bulletins_in_time,
        filter_label: i18n.filters.bulletins_in_time,
        label: i18n.filters.bulletins_in_time,
        yAxisLabel: i18n.axes.Bulletins,
        xAxisLabel: i18n.axes.date
      },
      {
        key: 'bulletin_confidence_bucket_exact',
        type: 'pie',
        title: i18n.title.bulletin_score,
        filter_label: i18n.filters.score
      },
      {
        key: 'sources_count_exact',
        type: 'pie',
        title: i18n.title.bulletin_number_sources,
        filter_label: i18n.filters.number_sources
      }
    ]);

    bulletinGraphs.each(function(bGraph) {
      bGraph.set('entity', 'bulletin');
    });

    incidentGraphs = new GraphTypeCollection([
      {
        key: 'most_recent_status_incident_exact',
        type: 'pie',
        title: i18n.title.incident_status,
        filter_label: i18n.filters.status
      },
      {
        key: 'incident_labels_exact',
        type: 'bar',
        title: i18n.title.incident_labels,
        filter_label: i18n.filters.labels,
        yAxisLabel: i18n.axes.Incidents
      },
      {
        key: 'incident_crimes_exact',
        type: 'bar',
        title: i18n.title.incident_crimes,
        filter_label: i18n.filters.crimes,
        yAxisLabel: i18n.axes.Incidents
      },
      {
        key: 'incident_searchable_locations_exact',
        type: 'bar',
        title: i18n.title.incident_location,
        filter_label: i18n.filters.location,
        yAxisLabel: i18n.axes.Incidents
      },
      {
        key: 'incident_created_date',
        type: 'trend',
        title: i18n.title.incidents_in_time,
        label: i18n.filters.incidents_in_time,
        filter_label: i18n.filters.incidents_in_time,
        yAxisLabel: i18n.axes.Incidents,
        xAxisLabel: i18n.axes.Date
      },
      {
        key: 'incident_confidence_bucket_exact',
        type: 'pie',
        title: i18n.title.incident_score,
        filter_label: i18n.filters.score
      }
    ]);

    incidentGraphs.each(function(iGraph) {
      iGraph.set('entity', 'incident');
    });

    userGraphs = new GraphTypeCollection([
      {
        key: 'user_login_time',
        type: 'pie',
        title: i18n.title.user_login_time,
        filter_label: i18n.filters.user_login_time
      },
      {
        key: 'user_login_per_day',
        type: 'bar',
        title: i18n.title.user_login_per_day,
        filter_label: i18n.filters.user_login_per_day,
        user_required: true,
        yAxisLabel: i18n.axes.Hours,
        xAxisLabel: i18n.axes.Date
      },
      {
        key: 'user_average_updates',
        type: 'pie',
        title: i18n.title.user_average_updates,
        filter_label: i18n.filters.user_average_updates
      },
      {
        key: 'user_assigned_items_by_status',
        type: 'pie',
        title: i18n.title.user_assigned_items_by_status,
        filter_label: i18n.filters.user_assigned_items_by_status,
        user_required: true
      },
      {
        key: 'user_deleted_items',
        type: 'pie',
        title: i18n.title.user_deleted_items,
        filter_label: i18n.filters.user_deleted_items
      },
      {
        key: 'user_created_items',
        type: 'pie',
        title: i18n.title.user_created_items,
        filter_label: i18n.filters.user_created_items
      },
      {
        key: 'user_edited_items',
        type: 'pie',
        title: i18n.title.user_edited_items,
        filter_label: i18n.filters.user_edited_items
      },
      {
        key: 'user_deleted_edited_created',
        type: 'trend',
        title: i18n.title.user_deleted_edited_created,
        filter_label: i18n.filters.user_deleted_edited_created,
        user_required: true,
        yAxisLabel: i18n.axes.Entities,
        xAxisLabel: i18n.axes.Time
      }
    ]);
    userGraphs.each(function(uGraph) {
      uGraph.set('entity', 'user');
    });

    userGraphs.entity = 'users';
    actorGraphs.entity = 'actors';
    bulletinGraphs.entity = 'bulletins';
    incidentGraphs.entity = 'incidents';

    allGraphs = new Backbone.Collection(userGraphs.toJSON());
    allGraphs.add(actorGraphs.toJSON());
    allGraphs.add(bulletinGraphs.toJSON());
    allGraphs.add(incidentGraphs.toJSON());

    return {
      selectGraphTypeFromKey: selectGraphTypeFromKey,
      userGraphs    : userGraphs,
      actorGraphs   : actorGraphs,
      bulletinGraphs: bulletinGraphs,
      incidentGraphs: incidentGraphs,
      allGraphs     : allGraphs
    };
  }
);
