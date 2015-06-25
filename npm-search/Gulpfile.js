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
    gulpif     = require('gulp-if');

gulp.task('styles', function () {
    gulp.src(['assets/css/base.css', 'assets/css/flexboxgrid.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./build/'));

});

gulp.task('scripts', function () {
    browserify('./assets/js/app.js', { debug: argv.debug ? true : false })
        .transform(reactify)
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

gulp.task('dev', function () {
    gulp.run('build');

    gulp.watch(['assets/js/**/*.js', 'assets/js/*.json'], [ 'scripts' ]);
    gulp.watch('assets/css/**/*.css', [ 'styles' ]);
    gulp.watch('assets/img/**/*', [ 'images' ]);

});

gulp.task('build', [ 'styles', 'scripts', 'images' ]);
