'use strict';
module.exports = function(grunt) {

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config:grunt.file.readJSON('config.json'),
    watch: {
      reloadServer: {
        options: {
          livereload: true
        },
        files: ['attachments/*.html', 'attachments/partials/**/*.html', 'attachments/css/styles.css', 'attachments/js/**/*.js'],
        tasks: ['shell:reloadServer']
      },
      stylesheets: {
        files: ['attachments/css/**/*.less'],
        tasks: ['less']
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
    },
    preprocess: {
      livereloadout: {
        options: {
          context: {
            PRODUCTION: true
          }
        },
        files: {
          'attachments/index.html' : 'attachments/index.html'
        }
      }
    },
    copy: {
      after: {
        src: './tmp/index.html',
        dest: 'attachments/index.html'
      },
      before: {
        src: 'attachments/index.html',
        dest: './tmp/index.html'
      },
      npmsearch: {
        expand: true,
        cwd: 'npm-search/build/',
        src: ['**', '!.gitkeep'],
        dest: 'attachments/npm/'
      }
    },
    clean: {
      npmsearch: {
        src: 'attachments/npm/'
      }
    }
  });
  
  //load all of the grunt tasks
  require('load-grunt-tasks')(grunt);
  
  grunt.registerTask('server', function (target) {
      grunt.task.run([
          'configureProxies:localRegistry',
          'connect:develop',
          'shell:reloadServer',
          'watch'
      ]);
  });

  grunt.registerTask('npmsearch', function(target) {
      grunt.task.run([
          'clean:npmsearch', // Deletes all files from attachments/npm 
          'copy:npmsearch'   // Copy npm website from npm-search directory to attachments/npm
      ])
  });

  grunt.registerTask('cloudant', function (target) {
      grunt.task.run([
          'less',
          'copy:before', //Copy index.html to tmp, to save the preprocess directives
          'preprocess', //Preprocess out the livereload script.
          'shell:cloudant', 
          'copy:after' //Copy index.html back to attachments, with the preprocess directives as seved.
      ]);
  });

  grunt.registerTask('iriscouch', function (target) {
      grunt.task.run([
          'less',
          'copy:before', //Copy index.html to tmp, to save the preprocess directives
          'preprocess', //Preprocess out the livereload script.
          'shell:iriscouch',   
          'copy:after' //Copy index.html back to attachments, with the preprocess directives as seved.
      ]);
  });
  grunt.registerTask('pre', ['copy:before', 'preprocess', 'copy:after']);
};
