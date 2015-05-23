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
      infrastructure:
        files: ['src/infrastructure.coffee']
        tasks: 'browserify:infrastructure'
        options:
          livereload: true
    browserify:
      infrastructure:
        files:
          'dist/assets/js/infrastructure.js': 'src/infrastructure.coffee'
        options:
          transform: ['icsify']
          browserifyOptions:
            extensions: '.coffee'
            paths: ['./src', './src/app']
      dev:
        files:
          'dist/assets/js/app.js': 'src/app/index.coffee'
        options:
          transform: ['icsify', 'hbsfy']
          browserifyOptions:
            extensions: '.coffee'
            paths: ['./src', './src/app']
      clean:
        files:
          'dist/assets/js/app.js': 'src/app/index.coffee'
          'dist/assets/js/infrastructure.js': 'src/infrastructure.coffee'
        options:
          transform: ['icsify', 'hbsfy', 'uglifyify']
          browserifyOptions:
            extensions: '.coffee'
            paths: ['./src', './src/app']
    uglify:
      dist:
        files:
          'dist/assets/js/app.js': 'dist/assets/js/app.js'
          'dist/assets/js/infrastructure.js': 'dist/assets/js/infrastructure.js'
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
