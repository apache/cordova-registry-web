#  Cordova Plugin NPM Search
This repo contains the assets for [plugins.cordova.io/npm](http://plugins.cordova.io/npm). Below we go over the steps of getting setup and running locally.

##Setup
### Clone this repo & install dependencies
```bash
git clone https://github.com/apache/cordova-registry-web.git
```
In your terminal, navigate to the cordova-registry-web/npm-search directory and `npm install`. This will install the dependencies required to deploy locally.

We also need to install the `gulp` globally. Type `npm i gulp -g`.

##Dev workflow
Once all the dependencies are installed run `gulp dev --debug` and launch a local [HTTP server](https://www.npmjs.com/package/http-server) in npm-search folder. The web site is designed to run on client side, which means all the content can be served statically.

Alternatively, you can use browser-sync based workflow. This enables browser-sync which allows for live reloading, multiple browsers in sync:
```	
gulp serve --debug
```
	
##Building for deployment
Use `gulp build`, as this genreates app.js in the build\ directory with minification and removing all non-production code in React.
 