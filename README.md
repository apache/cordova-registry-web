Cordova Registry UI
===================
This repo contains the assets for [stage.plugins.cordova.io](http://stage.plugins.cordova.io). The site is located in the attachments folder. Below we go over the steps of getting setup, running locally and pushing to the server. The main UI files for the site can be found in the `attachments` directory.

Setup
=====
### Clone this repo & install dependencies
```bash
git clone https://git-wip-us.apache.org/repos/asf/cordova-registry-web.git
```
In your terminal, navigate to the cordova-registry-web directory and run `git checkout refactor` and `npm install`. This will install the dependencies required to deploy locally for the refactor branch.

We also need to install the `grunt-cli` globally. Type `npm install grunt-cli -g`. 

### Clone Cordova-Registry repo
If you are interested in publishing plugins to your local repo, you will need this repo.
```bash
git clone https://git-wip-us.apache.org/repos/asf/cordova-registry-web.git
```
Navigate to the cordova-registry directory and run `npm install`.

### Install & Start CouchDB
```bash
brew install couchdb
```
Once installed, start CouchDB. You can do this by running `couchdb` in your terminal. 
Go to `http://localhost:5984` in your browser to confirm it is working.

### Create databases in couch

* Registry - holds plugins, views and site ui

```bash
curl -X PUT http://localhost:5984/registry
```

* Downloads - holds download counts

```bash
curl -X PUT http://localhost:5984/downloads
```

### Replicate remote databases
If you want to see actual plugins and download counts when you are working locally, you will have to replicate the remote dbs. This could take a while as they are large. An alternative to replicating is to publish plugins locally for testing purposes.

Note: We are in the process of moving over form IrisCouch to Cloudant. Iris Couch seems to have better replication support. Replicate from either.

* IrisCouch

```bash
curl -X POST -d '{"source":"http://cordova.iriscouch.com/registry", "target":"http://localhost:5984/registry"}' http://localhost:5984/_replicate -H "Content-Type: application/json"
```
and
```bash
curl -X POST -d '{"source":"http://cordova.iriscouch.com/downloads", "target":"http://localhost:5984/downloads"}' http://localhost:5984/_replicate -H "Content-Type: application/json"
```
or
* Cloudant

```bash
curl -X POST -d '{"source":"http://apachecordova.cloudant.com/registry", "target":"http://localhost:5984/registry"}' http://localhost:5984/_replicate -H "Content-Type: application/json"
```
and
```bash
curl -X POST -d '{"source":"http://apachecordova.cloudant.com/downloads", "target":"http://localhost:5984/downloads"}' http://localhost:5984/_replicate -H "Content-Type: application/json"
```

### Potential Errors
A possible error may be that you don't have a local `_replicate` db. You can create one with:
```bash
curl -X PUT http://localhost:5984/_replicate
```

Deploy Locally
==============

### Cordova-registry
Navigate to cordova-registry directory in your terminal and run the following command.
```bash
couchapp push app.js http://localhost:5984/registry
```

### Cordova-registry-web
Navigate to cordova-registry-web directory in your terminal and run the following command.
```bash
grunt server
```

You show now be able to view the site at http://localhost:5000 in your browser.
The site is setup to use livereload. As you modify & save files in the `attachments` directory, the browser will automatically reload the page.

NOTE - The Grunt server & watch commands are set up to use livereload - this will automatically reload your browser after the server is done reloading - no more needing to click the refresh button on your browser. The livereload script is put in the HEAD of the index.html page - if you wish to not use it, you will need to comment or remove that from the index.html page.

### Publish Plugins to your local instance
```bash
plugman config set registry http://localhost:5984/registry/_design/app/_rewrite
```
Now you can run commands like `plugman publish` and the plugins will be published to your local registry db.

### Potential Errors
If you keep seeing `POST /_session 401` when you try to publish a plugin locally, you need to go delete your user info. In terminal type `rm -rf ~/.plugman`. Then go to the plugin you want to add and go `plugman adduser`. Enter in your username, password and email.

Deploy Remotely
==============
Contact Steve or Anis to get username and passwords for remote couchdb instances. Any Cordova committers will be given the information if requested. Currently [plugins.cordova.io](http://plugins.cordova.io) is hosted on Iris Couch and [stage.plugins.cordova.io](http://stage.plugins.cordova.io) is hosted on Cloudant. The plan is to move over to Cloudant when this site launches. This will require setting up the default plugman registry to Cloudant. This should be doable by changing the DNS for `registry.cordova.io`

### Cordova-registry
Navigate to cordova-registry directory in your terminal and run the following command.

Note: I don't believe we will be updating cordova-registry often. These commands probably won't be needed much.
```bash
couchapp push app.js http://username:password@apachecordova.cloudant.com/registry
```
or
```bash
couchapp push app.js http://username:password@cordova.irishcouch.com/registry
```


### Cordova-registry-web
Navigate to cordova-registry-web directory in your terminal and run the following command.
```bash
grunt cloudant
```
or
```bash
grunt iriscouch
```

If you update your local config.json with credentials and don't want to push those changes up to git (so we don't accidentally commit passwords), run `git update-index --assume-unchanged config.json` after you have modified your config.json.


