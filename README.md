corroborator
============

Case management with data validation, corroboration, omission and duplication checking.
See `doc/system.rst` for an overview (https://github.com/equalitie/open-corroborator/blob/updatedemo/doc/system.rst)

Installation
============

Install virtualenv:

```
[sudo] apt-get install python-virtualenv
```

Other packages are required for modules and other build dependencies:

```
[sudo] apt-get install libmysqlclient-dev python-dev mysql-client libxslt-dev libgeos-c1 git libjpeg-dev libevent-dev
```

If video thumbnailing is turned on (`settings.VIDEO_THUMBNAILING = True`) then `ffmpeg` is required:

see https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu (or use the Ansible deployment scripts)


#### Install local python environment
From the project root folder run:

```
virtualenv --python=python2.7 env --no-site-packages
```

#### Install required packages

```
env/bin/easy_install -U distribute
env/bin/pip install -r requirements.txt
```

#### Create and configure the (development) database
In mysql, create a database and user for the app:

```
CREATE DATABASE corroborator_dev CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'django'@'localhost' identified by 'password';
GRANT ALL ON corroborator_dev.* to 'django'@'localhost';
```

If you change the username/password, make sure they are put in the DATABASE setting in ```corroborator/settings/dev.py```.

#### Initial database sync.
If you have no database set up, run:

```
env/bin/python2.7 manage.py migrate --fake-initial --settings=corroborator.settings.dev
```

To install the minimum data fixtures (including an admin user, password
'password'):

```
env/bin/python2.7 manage.py loaddata corroborator_app/fixtures/admin_user.json --settings=corroborator.settings.dev 
env/bin/python2.7 manage.py loaddata corroborator_app/fixtures/status_update.json --settings=corroborator.settings.dev 
env/bin/python2.7 manage.py loaddata corroborator_app/fixtures/auth.json --settings=corroborator.settings.dev 
```

And to install some sample fixtures (including 'demo' and 'demodata' users, password 'demo'):

```
env/bin/python2.7 manage.py loaddata corroborator_app/fixtures/demo_user.json --settings=corroborator.settings.dev 
env/bin/python2.7 manage.py loaddata corroborator_app/fixtures/crimes.json --settings=corroborator.settings.dev 
env/bin/python2.7 manage.py loaddata corroborator_app/fixtures/locations_UA.json --settings=corroborator.settings.dev 
```

##### Permissions
The `demo` user is a member of the chief-data-analyst, data-analyst and senior-data-analyst groups and should also be given 
the following permissions (via the admin interface) to be able to edit any item:

   * 'Can assign users via api'
   * 'Can delete entities via api'
   * 'Can edit entities via api'
   * 'Can edit assigned entities via api'

The `demodata` user is a member of the data-entry group and sees a simplified data-entry interface for bulletins and actors.

### Solr installation

Solr needs a few packages installed before use:

```
[sudo] apt-get install openjdk-6-jdk
```

Download and install Solr 4, e.g.

```
wget http://www.eu.apache.org/dist/lucene/solr/4.10.4/solr-4.10.4.tgz
tar -xvf solr-4.10.4.tgz
```

Then add a new core:

```
cd solr-4.10.4/

mkdir example/solr/corroborator-search
cp -R example/solr/collection1/conf/ example/solr/corroborator-search/
echo "name=corroborator-search" > example/solr/corroborator-search/core.properties
cp ../conf/solr.schema.demo.xml example/solr/corroborator-search/conf/schema.xml
```

And start Solr

```
bin/solr start
```
 
#### Other configuration
```
cd ..
env/bin/python2.7 manage.py backfill_api_keys --settings=corroborator.settings.dev
env/bin/python2.7 manage.py rebuild_index --settings=corroborator.settings.dev
```

#### Media storage
By default, uploaded media is stored in MEDIA_ROOT. To store media in S3, 
set `QUEUED_STORAGE = True` and set the 3 `AWS_*` settings - see the deployment 
steps for more details.

### Running
To run the celery worker (to process Solr updates and any S3 updates if used)

```
env/bin/python2.7 manage.py celery worker --events --time-limit 300 --concurrency 1 --queues celery --settings=corroborator.settings.dev
```

To run the development server:

```
env/bin/python2.7 manage.py runserver --settings=corroborator.settings.dev
```

Test in a browser via http://localhost:8000/ and login with 'demo', password 'demo'.

Deployment
==========
See https://github.com/equalitie/open-corroborator-deploy for Ansible deployment scripts.


Development
===========

### Solr
Changes to model schema where new fields are added or removed from Bulletin, Incident or Actor
models will require an update to the solr schema. To do this the schema.xml file must be updated.
Haystack will generate a new schema.xml file with the command

```
env/bin/python manage.py build_solr_schema --settings=corroborator.settings.dev > schema.demo.xml
```
from the root dir of the project

you must then copy this file to the conf folder of your solr instance and add this line under the fields section
```
<field name="_version_" type="long" indexed="true" stored="true"/>
```

And prefix any `stopwords_en.txt` references with `lang/`, e.g. "lang/stopwords_en.txt"

The Solr index can then be re-generated by running
```
env/bin/python manage.py rebuild_index --settings=corroborator.settings.dev 
```

### Javascript
For Javascript template compiling etc. see the github wiki. Some steps to getting things working are:

Install node and npm packages:

```
[sudo] apt-get install nodejs npm nodejs-legacy
```

Install latest npm, grunt, karma:

```
npm install -g grunt-cli karma
```

Install the application packages:

```
cd static/js
npm install
```

(Note: this creates a static/js/node_modules folder with many subdirectories. These can impact initial load times in development
because Django FileSystemFinder and Django debug-toolbar scan the static folder. Switching off the 'Static files' checkbox 
in debug-toolbar should improve things.)

To build a build.js file (used if PROD_BUILD=True, though currently built for a single language):

```
cd static/js
grunt build
```

To compile handlebars templates:

```
cd static/js
grunt handlebars
```

### CSS
See the wiki (bundle, guard, compass (sass) etc), though this seemed to work:

```
sudo apt-get install bundler

bundle install
```

bundle exec guard
