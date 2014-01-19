'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'attachments/js/*.js', 'attachments/controllers/*.js'],
      options: {
        jshintrc: true
      }
    },
    watch: {
      changeFiles: {
        files: ['attachments/*.html', 'attachments/partials/**/*.html', 'attachments/css/*.less', 'attachments/css/**/*.css', 'attachments/js/**/*.js'],
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
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-jshint');
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint']);

};