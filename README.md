Install COUCHDB

brew install couchdb

create registry database in couch
curl -X PUT http://localhost:5984/registry

npmjs
git clone https://github.com/imhotep/npmjs.org

cordova registry web
git clone https://git-wip-us.apache.org/repos/asf/cordova-registry-web.git

cd npmjs
npm install -g couchapp
npm install couchapp
npm install semver

couchapp push registry/app.js http://localhost:5984/registry

cd ../cordova-registry-web
couchapp push app.js http://localhost:5984/registry

Pretty much all of the work you need to do is in cordova-registry-web

Enter this into your terminal because legacy.
curl http://localhost:5984/registry/_design/scratch -X COPY  -H destination:'_design/app'

## Displaying on localhost

cd /etc/apache2/users
sudo vim YOURCOMPUTERUSERNAME.conf (mine was stevengill.conf)

Paste the following rewrite rules into it.

<VirtualHost *:80>
  ServerName localhost
  RewriteEngine on
#  RewriteRule ^/downloads/(.*)$ http://cordova.iriscouch.com/downloads/$1 [P]
#  RewriteRule ^/(.*)$ /registry/_design/ui/_rewrite/$1 [PT]
  RewriteRule ^/((?!downloads).*)$ /registry/_design/ui/_rewrite/$1 [PT]
  ProxyPassMatch ^/downloads/(.*)$ http://cordova.iriscouch.com/downloads/$1
  ProxyPassMatch ^/registry/(.*)$ http://localhost:5984/registry/$1
  RewriteLog "/var/log/apache2/plugins.cordova.io-rewrite.log"
  RewriteLogLevel 3
  LogLevel debug
  ErrorLog "/var/log/apache2/plugins.cordova.io-error_log"
  CustomLog "/var/log/apache2/plugins.cordova.io-access_log" common
</VirtualHost>

back to terminal, start apache with:
sudo apachectl start

go to localhost in your browser and bam! should be working.


## Publish Plugins to your local instance
plugman config set registry http://localhost:5984/registry/_design/app/_rewrite


##Potential Errors

If you keep seeing `POST /_session 401` when you try to publish a plugin locally, you need to go delete your user info. In terminal type `rm -rf ~/.plugman`. Then go to the plugin you want to add and go `plugman adduser`. Enter in your username, password and email. 



