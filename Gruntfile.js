module.exports = function(grunt) {

  grunt.registerTask('default', 'watch');

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,
    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      appjs: {
        files: ['dist/js/app.js'],
        options: { livereload: true }
      },
      appcss: {
        files: ['dist/css/**/*.css'],
        options: { livereload: true }
      },
      hbsfy: {
        files: ['build/app/templates/**/*.hbs'],
        tasks: ['browserify']
      },
      buildjs: {
        files: [
          'build/app/**/*.coffee',
        ],
        tasks: ['browserify']
      },
      vendor: {
        files: ['build/vendor/**/*.js'],
        tasks: ['concat:vendor']
      },
      plugins: {
        files: ['build/plugins/**/*.js'],
        tasks: ['concat:plugins']
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/js/app.js': ['build/app/application.coffee']
        },
        options: {
          transform: ['caching-coffeeify', 'hbsfy'],
          browserifyOptions: {
            paths: ['./build/app']
          }
        }
      }
    },
    concat: {
      vendor: {
        separator: ';',
        files: {
          'dist/js/vendor.js': ['build/vendor/**/*.js']
        }
      },
      plugins: {
        separator: ';',
        files: {
          'dist/js/plugins.js': ['build/plugins/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
};
