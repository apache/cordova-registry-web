{\rtf1\ansi\ansicpg1252\cocoartf1187\cocoasubrtf400
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f0\fs24 \cf0 Install COUCHDB\
\
brew install couchdb\
\
create registry database in couch\
curl -X PUT http://localhost:5984/registry\
\
npmjs\
git clone https://github.com/imhotep/npmjs.org\
\
cordova registry web\
git clone https://git-wip-us.apache.org/repos/asf/cordova-registry-web.git\
\
cd npmjs\
npm install -g couchapp\
npm install couchapp\
npm install semver\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural
\cf0 couchapp push registry/app.js http://localhost:5984/registry\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural
\cf0 \
cd ../cordova-registry-web\
couchapp push app.js http://localhost:5984/registry\
\
Pretty much all of the work you need to do is in cordova-registry-web\
\
Enter this into your terminal because legacy.\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural
\cf0 curl http://localhost:5984/registry/_design/scratch -X COPY  -H destination:'_design/app'\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural
\cf0 \
## Displaying on localhost\
\
cd /etc/apache2/users\
sudo vim YOURCOMPUTERUSERNAME.conf (mine was stevengill.conf)\
\
Paste the following rewrite rules into it.\
\
<VirtualHost *:80>\
  ServerName localhost\
  RewriteEngine on\
#  RewriteRule ^/downloads/(.*)$ http://cordova.iriscouch.com/downloads/$1 [P]\
#  RewriteRule ^/(.*)$ /registry/_design/ui/_rewrite/$1 [PT]\
  RewriteRule ^/((?!downloads).*)$ /registry/_design/ui/_rewrite/$1 [PT]\
  ProxyPassMatch ^/downloads/(.*)$ http://cordova.iriscouch.com/downloads/$1\
  ProxyPassMatch ^/registry/(.*)$ http://localhost:5984/registry/$1\
  RewriteLog "/var/log/apache2/plugins.cordova.io-rewrite.log"\
  RewriteLogLevel 3\
  LogLevel debug\
  ErrorLog "/var/log/apache2/plugins.cordova.io-error_log"\
  CustomLog "/var/log/apache2/plugins.cordova.io-access_log" common\
</VirtualHost>\
\
back to terminal, start apache with:\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural
\cf0 sudo apachectl start\
\
go to localhost in your browser and bam! should be working.\
\
\
## Publish Plugins to your local instance\
plugman config set registry http://localhost:5984/registry/_design/app/_rewrite\
\
\
##Potential Errors\
\
If you keep seeing `POST /_session 401` when you try to publish a plugin locally, you need to go delete your user info. In terminal type `rm -rf ~/.plugman`. Then go to the plugin you want to add and go `plugman adduser`. Enter in your username, password and email. \
\
\
Alternative\
couchapp serve app.js http://localhost:5984/registry -p 3000 -l -d attachments/\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural
\cf0 \
}