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
    serve      = require('gulp-serve'),
    envify     = require('envify');

gulp.task('styles', function () {
    gulp.src(['src/css/normalize.css', 'src/css/base.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('scripts', function () {
    // This is needed for envify to remove debug only code from REACT
    process.env.NODE_ENV = argv.debug ? '' : 'production';
    browserify('./src/js/app.js', { debug: argv.debug ? true : false })
        .transform(reactify)
        .transform(envify)
        .bundle()
        .on('error', gutil.log)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(!argv.debug, uglify())) // minify only if not debug build.
        .on('error', gutil.log)
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('images', function () {
    gulp.src(['src/img/**/*.png', 'src/img/**/*.gif'])
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img/'));
    gulp.src(['src/img/**/*.svg'])
        .pipe(gulp.dest('./build/img'));
});

gulp.task('html', function () {
    gulp.src(['src/*.html'])
        .pipe(gulp.dest('./build/'));
});

gulp.task('etc', function () {
    gulp.src(['src/etc/*'])
        .pipe(gulp.dest('./build/etc'));
})

gulp.task('dev', ['build'], function () {
    gulp.watch(['src/js/**/*.js', 'src/js/*.json', 'src/js/**/*.jsx'], [ 'scripts' ]);
    gulp.watch('src/css/**/*.css', [ 'styles' ]);
    gulp.watch('src/img/**', [ 'images' ]);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/etc/**', ['etc']);
});

gulp.task('serve', ['dev'], serve('build'));

gulp.task('build', [ 'styles', 'scripts', 'images', 'html', 'etc' ]);
