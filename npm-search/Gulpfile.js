var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    imagemin   = require('gulp-imagemin'),
    gutil      = require('gulp-util'),
    buffer     = require('vinyl-buffer'),
    source     = require('vinyl-source-stream'),
    browserify = require('browserify'),
    argv       = require('yargs').argv,
    reactify   = require('reactify'),
    uglify     = require('gulp-uglify'),
    gulpif     = require('gulp-if'),
    browserSync = require('browser-sync'),
    envify      = require('envify');

gulp.task('styles', function () {
    gulp.src(['assets/css/base.css', 'assets/css/flexboxgrid.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./build/'));

});

gulp.task('scripts', function () {
    // This is needed for envify to remove debug only code from REACT
    process.env.NODE_ENV = argv.debug ? '' : 'production';
    browserify('./assets/js/app.js', { debug: argv.debug ? true : false })
        .transform(reactify)
        .transform(envify)
        .bundle()
        .on('error', gutil.log)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(!argv.debug, uglify())) // minify only if not debug build.
        .on('error', gutil.log)
        .pipe(gulp.dest('./build/'));
});

gulp.task('images', function () {
    gulp.src(['assets/img/**/*.png', 'assets/img/**/*.gif'])
        .pipe(imagemin())
        .pipe(gulp.dest('build/img/'));
    gulp.src(['assets/img/**/*.svg'])
        .pipe(gulp.dest('build/img'));
});

gulp.task('dev', ['build'], function () {
    gulp.watch(['assets/js/**/*.js', 'assets/js/*.json'], [ 'scripts' ]);
    gulp.watch('assets/css/**/*.css', [ 'styles' ]);
    gulp.watch('assets/img/**/*', [ 'images' ]);

});

gulp.task('serve', ['dev'], function() {
  browserSync({
    server: {
      baseDir: '.'
    },
    files: [
      '*.html',
      './build/*.css',
      './build/*.js'
    ]
  });
});



gulp.task('build', [ 'styles', 'scripts', 'images' ]);
