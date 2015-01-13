module.exports = function(grunt) {

  grunt.registerTask('default', 'watch');

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,
    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      concatcss: {
        files: 'src/css/**/*.css',
        tasks: 'concat:css'
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
        files: ['src/app/templates/**/*.hbs'],
        tasks: ['browserify']
      },
      buildjs: {
        files: [
          'src/app/**/*.coffee',
        ],
        tasks: ['browserify']
      },
      vendor: {
        files: ['src/vendor/**/*.js'],
        tasks: ['concat:vendor']
      },
      plugins: {
        files: ['src/plugins/**/*.js'],
        tasks: ['concat:plugins']
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/js/app.js': ['src/app/application.coffee']
        },
        options: {
          transform: ['caching-coffeeify', 'hbsfy', 'uglifyify'],
          browserifyOptions: {
            paths: ['./src/app']
          }
        }
      }
    },
    concat: {
      css: {
        files: {
          'dist/css/bundle.css': ['src/css/**/*.css']
        }
      },
      vendor: {
        separator: ';',
        files: {
          'dist/js/vendor.js': ['src/vendor/**/*.js']
        }
      },
      plugins: {
        separator: ';',
        files: {
          'dist/js/plugins.js': ['src/plugins/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
};
