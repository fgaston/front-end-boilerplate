module.exports = (grunt) ->

  grunt.registerTask 'default', 'watch'
  grunt.registerTask 'build', ['browserify:clean', 'uglify', 'cssmin', 'zip']

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    watch:
      grunt:
        files: 'Gruntfile.coffee'
      css:
        files: 'src/**/*.css'
        tasks: 'cssmin'
        options: 
          livereload: true
      coffeebars:
        files: ['src/app/**/*.coffee', 'src/app/**/*.hbs']
        tasks: 'browserify:dev'
        options: 
          livereload: true
      plugins:
        files: ['src/plugins.coffee', 'src/lib/**/*.coffee', 'src/lib/**/*.js']
        tasks: 'browserify:plugins'
        options:
          livereload: true
    browserify:
      plugins:
        files:
          'dist/assets/js/plugins.js': 'src/plugins.coffee'
        options:
          transform: ['caching-coffeeify']
          browserifyOptions:
            paths: ['./src', './src/app']
      dev:
        files:
          'dist/assets/js/app.js': 'src/app/index.coffee'
        options:
          transform: ['caching-coffeeify', 'hbsfy']
          browserifyOptions:
            paths: ['./src', './src/app']
      clean:
        files:
          'dist/assets/js/app.js': 'src/app/index.coffee'
          'dist/assets/js/plugins.js': 'src/plugins.coffee'
        options:
          transform: ['caching-coffeeify', 'hbsfy', 'uglifyify']
          browserifyOptions:
            paths: ['./src', './src/app']
    uglify:
      dist:
        files:
          'dist/assets/js/app.js': 'dist/assets/js/app.js'
          'dist/assets/js/plugins.js': 'dist/assets/js/plugins.js'
    cssmin:
      target:
        files:
          'dist/assets/css/bundle.css': 'src/**/*.css'
    zip:
      target:
        cwd: './'
        src: ['index.js', 'package.json', 'dist/**/*.*']
        dest: 'build.zip'
        dot: true

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-zip'
  grunt.loadNpmTasks 'grunt-browserify'
