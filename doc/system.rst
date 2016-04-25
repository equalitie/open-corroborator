Open Corroborator
=================

Overview
--------
Source code: https://github.com/equalitie/open-corroborator

Deployment code: https://github.com/equalitie/open-corroborator-deploy

Target OS: Ubuntu 14.04 LTS

System Architecture
-------------------

.. image:: images/oc.png

The backend comprises a Django server which:

  * stores data in a mysql database
  * indexes data in a Solr search engine
  * stores media uploads locally and (optionally) in Amazon S3
  * creates thumbnail images of uploaded media
  * proxies media requests to Amazon S3
  * proxies search requests to Solr
  * exchanges data with a backbone-based Javascript frontend application

The backend runs behind an Apache webserver which:

  * passes application traffic to and from the gunicorn Django wrapper
  * serves static media files (Javascript, css, images)
  * serves local media upload files (thumbnail images, original images and videos)
  * accepts uploaded media files

Celery queued tasks are used to:

  * store uploads asynchronously onto Amazon S3
  * asynchronously (re-)index data in Solr


Possible Architecture Enhancements
----------------------------------

  * Put the thumbnailing into its own task so it can run asynchronously
  * Transcode videos (via an asynchronous task) to provide a compressed, browser-friendly
    version for playback
  * Add a cache (common queries and sessions can be stored there to improve performance, although
    this may be less of a benefit with the API handling most of the traffic)

Database Schema
---------------

.. image:: images/oc_data.png

Many tables have duplicate text fields for Arabic, e.g. `description_en` and `description_ar`. It's not clear
how these should be used for extra languages, e.g. Russian, Ukrainian, but for the time being, just the
`_en` fields will be used to store data for the currently selected language.
Likewise, it's not clear how metadata should be used to support multiple languages, e.g. status and location names,
other than limiting it to a single language per system.

The following database models are defined but not used:

  * Nationality
  * ActorStatus
  * Dialect
  * Position
  * Occupation
  * Ethnicity
  * Religion

So instead of referring to pre-defined lists of options, these have been replaced by free-text fields
on the Actor model.

And the following, although still linked by foreign key constraints and possibly having API end-points are also not used:

  * ActorRelationship
  * RoleType (superseded by role_status)
  * RelationType (superseded by relation_status)

Solr Schema
-----------
The `corroborator_app/search_indexes` package contains the Haystack index definitions. These are based on CelerySearchIndex
and so are called via celery:

  * IncidentIndex
  * BulletinIndex
  * ActorIndex

If these are changed, you should use them to generate an updated Solr schema by running:

.. code:: console

    env/bin/python manage.py build_solr_schema --settings=corroborator.settings.dev > newschema.xml

And then move the generated xml file into the Solr collection `conf` folder (as schema.xml) for local testing.

Once the schema is tested, copy it to `conf/solr.schema.demo.xml` where the Ansible scripts will use it for deployment.

Database/Solr split
---------------------
The listings displayed in the frontend (incidents, bulletins, actors) are driven by the data that has been
added to the Solr search engine.
This can be confusing after running automated tests or after switching databases, as the Solr and mysql data
won't be aligned. To re-build the Solr index from the database:

.. code:: console

    env/bin/python manage.py rebuild_index --settings=corroborator.settings.dev

Local System/Deployment Testing
-------------------------------
Vagrant and Ansible can be used to spin up a full system locally. Checkout the deployment repository and:

.. code:: console

    vagrant up

or:

.. code:: console

    vagrant provision    #if the VM is already running

should create an Ubuntu VM and install the whole system (from github) into it, with all components left running.

There are options to change the branch used, and to skip steps, e.g. building ffmpeg (which can take a long time).

Permissions
-----------
There are 3 user groups controlling access and workflow. Each one has a limited number of status options when editing records:

  * data-analyst: statuses available: updated
  * senior-data-analyst: statuses available: updated, reviewed
  * chief-data-analyst: statuses available: updated, reviewed, finalized

The senior-data-analyst group has access to the Administration tab (and can run reports, though not see the Reporting tab).

The chief-data-analyst group has access to the Reporting, Monitoring and Administration tabs.

In addition, the following permissions are available but must be granted to each user who needs them:

  * 'Can delete entities via api' - the user can delete any record
  * 'Can edit entities via api' - the user can edit any record
  * 'Can assign users via api' - the user can assign a user to any record so that they can edit it

  * 'Can edit assigned entities via api' - the user can edit any record to which they are assigned

So a data-analyst could be given just the extra 'Can edit assigned entities via api' permission and then is limited
to editing **only** those records that have been assigned to them (though they can still view *all* the records in the system).

The default `demo` user is a member of all three groups. The `demo` user should also be given these
extra permissions to give full access to the features available:

  * 'Can assign users via api'
  * 'Can delete entities via api'
  * 'Can edit entities via api'
  * 'Can edit assigned entities via api'

Data Entry
..........
Another user group is used to switch to a simpler data-entry view of the application: `data-entry`. If a user is
assigned to this group (and not `data-analyst` or `chief-data-analyst`) then the user is limited to adding new bulletins
and actors. The default `demodata` user is a member of this group and so sees the simplified data-entry interface.

Data Export
-----------
Data for some models can be exported from the Administration section to CSV files.

The Action drop-down has an 'Export to CSV' option which will download a file containing the selected items.

Note: the select-all checkbox will only select all the items on the current page. Clicking this gives another option
alongside the count of items selected, 'Select all...' - you should click this to select *all* items before
clicking `Go` to export.

Backend Stack
-------------
The following are the major packages added to Django:

  * Pillow - used for image manipulation
  * Celery - used for queued tasks
  * Haystack - used to communicate with Solr
  * Queued-storage - used to asynchronously make copies of media to S3
  * Reversion - used to keep a user-facing audit of record changes
  * Tastypie - used to build the API for the Javascript application
  * Sendfile - used to serve media via Apache

Build/deploy the Backend
........................
To deploy the backend, the following steps are needed:

  * `pip install -r requirements.txt`
  * `syncdb`
  * `collectstatic` (for production)

The ansible deployment scripts will do this.

Frontend Stack
--------------
The following packages are included in the frontend Javascript application:

  * requirejs - provides module handling for Javascript
  * requirejs-i18n - provides translations for requirejs modules
  * leaflet - maps library
  * jquery - provides DOM manipulation for Javascript
  * jquery-ui - provides widgets
  * handlebars - provides templating for Javascript
  * modernizr - provides feature detection for Javascript
  * q - provides asynchronous calls for Javascript (not used?)
  * bacon - ?
  * bacon-ui - ?
  * backbone - provides simplified ORM
  * moment - provides datetime handling for Javascript
  * d3 - provides charting tools
  * nvd3 - provides chart components
  * sizzle - provides DOM selectors for Javascript
  * flowplayer - used to play videos in the browser (flash-based) (not include in bower)

The frontend application is mostly in `static/js/lib` and is split into obvious sections,
e.g. CRUD, SolrSearch, monitor, reporting, etc.

It could be built into `dist/build-ar.js` although that seems to need to be built for each language
(assuming `ar` is the language code?) and the frontend language switching may need some more work
to support that.

Build/deploy the Frontend
-------------------------
The following tools are used for building the frontend Javascript application:

  * Node - runs Javascript
  * npm - node package manager
  * buster - test tools/modules
  * bower - provides package handling for Javascript
  * yeoman - runs other things?
  * grunt - runs other things
  * growl - user notifications
  * uglify - parser(?)/compressor/beautifier(?) for Javascript
  * grunt-handlebars - translates templates into Javascript
  * jshint - provides code checking for Javascript
  * karma - used for test running
  * yadda - used for testing
  * lodash - provides array, string, object handling for Javascript
  * etc.

Plus:

  * Ruby
  * rvm - ruby package manager
  * bundle - runs other things?
  * guard - runs other things?
  * compass - translate SASS to CSS

Before deploying the frontend, the following steps are needed:

  * `npm install`  #install a host of node modules
  * `bundle exec guard`  #translates SASS into CSS stylesheets (i.e. sass -> .css)
  * `grunt handlebars`  #translates templates into Javascript  (i.e. .tpl -> .js)
  * `grunt build`  #lints,tests and builds
  * commit the translated target files

The ansible deployment scripts won't do this
(though maybe they should - and then we could remove the target files from the repository?) - they
will simply deploy the pre-built, committed files.

Field changes
-------------
Adding, changing or removing a field would need changes to the backend model (database), search index, api and frontend.
For example, a change to an Actor field might need changes in the following places:

Backend
.......
  * models.py  #Actor model -> database migration
  * reports.py  #ActorModelReport

API
...
  * api
      * ActorApi.py
  * multisave
      * `__init__.py`

Search
......
  * index_meta_prep
      * actorPrepIndex.py
  * search_indexes
      * actor_index.py
  * templates
      * search
         * indexes
            * corroborator_app
               * actor_text.txt

Frontend
........
  * js
     * lib
        * CRUD
           * templates
              * display-templates
                 * actors
                    * actor.tpl
                    * actor-display.tpl
              * search-templates
                 * actor
                    * actor-result.tpl
                    * actor.tpl
                    * expanded-actor.tpl
           * views
              * actor-form.js
              * display-views
                 * actor-container.js ?
                 * actor-display-container.js
              * search-views
                 * actor-result.js
                 * actor-results.js ?
                 * actor-search-fields.js

           * SolrSearch
              * data
                 * actor-filter-collection.js
              * templates
                 * filters
                    * actor-filters.tpl ?
                 * results
                    * actor.tpl
                    * actor-results.tpl ?
                 * sort
                    * sort-actors.tpl
              * views
                 * filters
                    * actor-filters.js
                 * results
                    * ActorResults.js
        * Data
             * actor.js
        * data-entry
           * templates
              * actor-form.tpl
              * actor-preview.tpl
              * actor-list-item.tpl
           * views
              * actor-form.js

Plus test code changes at the various levels.


New Translations
----------------
To add a new language:

Add the option to the language selector widget in `corroborator_app/templates/nav/top_menu.html`.

Add a line to the root dict.js, e.g.

.. code::

    'es': true

Each Javascript `static/lib` module has a **dict.js** containing a mapping of source to target strings
for the frontend application. These should be uploaded to Transifex along with an up-to-date `django.po` file.
From there, they can be translated to the target language and downloaded back into place.

To create a `django.po` for a new language, say `es`:

.. code:: console

    pushd corroborator_app
    django-admin.py makemessages -l es


Store the target `django.po` in a subdirectory for that language, e.g. `corroborator_app/locale_es/LC_MESSAGES/`
and then compile it (to a compress `.mo` format):

.. code:: console

    django-admin.py compilemessages

Store the translated `dict.js` files in the appropriate subdirectory for the module and language, e.g. `/static/js/lib/<module>/nls/es`

Note: currently, the format of the `dict.js` files is not accepted by Transifex.
The following changes needed to be made before uploading, and then reversed on downloading:

  * remove the `"'root': {"` and closing `}`
  * remove trailing `"ar": true` (true is not a string)
  * swap `"` and `'`, e.g.

    * replace `"` with `
    * replace `'` with `"`
    * replace ` with `'`

  * replace `",    {"` with `"    {"`

See http://docs.transifex.com/formats/require-js/ for acceptable JSON formats.

Deployment/Ops
--------------
When deployed via the Ansible scripts, the following services and logs are available.

Services
........
To restart (or `start`/`stop`/`status`) the gunicorn service:

.. code:: console

    service corroborator-gunicorn restart

To restart (or `start`/`stop`/`status`) the celery service:

.. code:: console

    service corroborator-celery restart

To restart (or `start`/`stop`/`status`) the Solr service:

.. code:: console

    service jetty restart

Logs
....
The Solr logs are here:

    /usr/share/jetty/logs

The gunicorn log is here:

    /var/log/upstart/corroborator-gunicorn.log

The Celery log is here:

    /var/log/upstart/corroborator-celery.log

The Apache logs are here:

    /var/log/apache2/corroborator-access.log
    /var/log/apache2/corroborator-error.log

Data Locations
..............
The following volatile data should be included in any backup.

The local media files are stored here:

    /var/local/sites/corroborator/var/media/

There may also be media files on Amazon S3 if `QUEUED_STORAGE=True`.

The Solr index data is stored here:

    /var/local/solr/corroborator-search/data/

The mysql database is stored here:

    /var/lib/mysql/<dbname>

Although a mysql backup system should be used to backup the database, e.g. `mysqldump`.

