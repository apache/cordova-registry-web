var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    imagemin   = require('gulp-imagemin'),
    gutil      = require('gulp-util'),
    buffer     = require('vinyl-buffer'),
    source     = require('vinyl-source-stream'),
    browserify = require('browserify'),
    reactify   = require('reactify');

gulp.task('styles', function () {
    gulp.src(['assets/css/base.css', 'assets/css/flexboxgrid.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./build/'));

});

gulp.task('scripts', function () {
    browserify('./assets/js/app.js', { debug: true })
        .transform(reactify)
        .bundle()
        .on('error', gutil.log)
        .pipe(source('app.js'))
        .pipe(buffer())
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

    gulp.watch(['assets/js/**/*.js', 'assets/js/official-plugins.json'], [ 'scripts' ]);
    gulp.watch('assets/css/**/*.css', [ 'styles' ]);
    gulp.watch('assets/img/**/*', [ 'images' ]);

});

gulp.task('build', [ 'styles', 'scripts', 'images' ]);
