module.exports = (grunt) ->

  grunt.registerTask 'default', 'watch'
  grunt.registerTask 'build', ['browserify:ugly', 'uglify', 'cssmin']

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    watch:
      grunt:
        files: 'Gruntfile.coffee'
      minifycss:
        files: 'src/css/**/*.css'
        tasks: 'cssmin'
      appjs:
        files: 'dist/js/app.js'
        options: 
          livereload: true
      appcss:
        files: 'dist/css/bundle.css'
        options: 
          livereload: true
      hbsfy:
        files: 'src/app/**/*.hbs'
        tasks: 'browserify:clean'
      buildjs:
        files: 'src/app/**/*.coffee'
        tasks: 'browserify:clean'
      vendor:
        files: 'src/vendor/**/*.js'
        tasks: 'concat:vendor'
      plugins:
        files: 'src/plugins/**/*.js'
        tasks: 'concat:plugins'
    browserify:
      clean:
        files:
          'dist/js/app.js': 'src/app/application.coffee'
        options:
          transform: ['caching-coffeeify', 'hbsfy']
          browserifyOptions:
            paths: ['./src/app']
      ugly:
        files:
          'dist/js/app.js': 'src/app/application.coffee'
        options:
          transform: ['caching-coffeeify', 'hbsfy', 'uglifyify']
          browserifyOptions:
            paths: ['./src/app']
    uglify:
      dist:
        files:
          'dist/js/app.js': 'dist/js/app.js'
    cssmin:
      target:
        files:
          'dist/css/bundle.css': 'src/css/**/*.css'
    concat:
      vendor:
        separator: ';'
        files:
          'dist/js/vendor.js': 'src/vendor/**/*.js'
      plugins:
        separator: ';'
        files:
          'dist/js/plugins.js': 'src/plugins/**/*.js'

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-browserify'
