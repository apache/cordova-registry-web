'use strict';
module.exports = function(grunt) {

  var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config:grunt.file.readJSON('config.json'),
    watch: {
      changeFiles: {
        files: ['attachments/*.html', 'attachments/partials/**/*.html', 'attachments/css/**/*.less', 'attachments/css/**/*.css', 'attachments/js/**/*.js'],
        tasks: ['less', 'shell:reloadServer']
      },
      options: {
        livereload: true
      }
    },
    shell: {
      options: {
        stdout: true
      },
      reloadServer: {
        command: 'couchapp push app.js http://localhost:5984/registry'
      },
      cloudant: {
        command: 'couchapp push app.js http://<%= config.cloudant.username %>:<%= config.cloudant.password %>@<%= config.cloudant.url %>/registry'
      },
      iriscouch: {
        command: 'couchapp push app.js http://<%= config.iriscouch.username %>:<%= config.iriscouch.password %>@<%= config.iriscouch.url %>/registry'
      }
    },
    less: {
      development: {
        options: {
          paths: ["attachments/css"]
        },
        files: {
          "attachments/css/styles.css": "attachments/css/styles.less"
        }
      },
    },
    connect: {
        options: {
            port: 5000,
            hostname: 'localhost'
        },
        localRegistry:{    
            proxies: [{
                context: '/',
                host: 'localhost',
                port:5984,
                https: false,
                changeOrigin: false,
                rewrite:{
                    '^/(.*)$':'/registry/_design/ui/_rewrite/$1'
                }
            }]
        },
        develop: {
            options: {
                middleware: function (connect, options) {
                    if (!Array.isArray(options.base)) {
                        options.base = [options.base];
                    }

                    // Setup the proxy
                    var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                    // Serve static files.
                    options.base.forEach(function(base) {
                        middlewares.push(connect.static(base));
                    });

                    // Make directory browse-able.
                    var directory = options.directory || options.base[options.base.length - 1];
                    middlewares.push(connect.directory(directory));

                    return middlewares;
                },
            }
        }
    }
  });
  
  //load all of the grunt tasks
  require('load-grunt-tasks')(grunt);
  
  grunt.registerTask('server', function (target) {
      grunt.task.run([
          'configureProxies:localRegistry',
          'connect:develop',
          'watch'
      ]);
  });

  grunt.registerTask('cloudant', function (target) {
      grunt.task.run([
          'less',
          'shell:cloudant'   
      ]);
  });
  grunt.registerTask('iriscouch', function (target) {
      grunt.task.run([
          'less',
          'shell:iriscouch'   
      ]);
  });
};
