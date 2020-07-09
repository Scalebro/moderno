let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', async function() {
    del.sync('dist')
});


gulp.task('scss', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({ stream: true }))
});
gulp.task('css', function() {
    return gulp.src([
            'node_modules/reset.css/reset.css',
            'node_modules/animate.css/animate.css',
            'node_modules/slick-carousel/slick/slick.css'
        ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('src/scss'))
        .pipe(browserSync.reload({ stream: true }))
});
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(browserSync.reload({ stream: true }))
});
gulp.task('js', function() {
    return gulp.src([
            'node_modules/slick-carousel/slick/slick.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function() {
    return gulp.src('src/*.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
});

gulp.task('export', function() {
    let buildHtml = gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))

    let buildCss = gulp.src('src/**/*.css')
        .pipe(gulp.dest('dist/'))

    let buildJs = gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))

    let buildFonts = gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))

    let buildImg = gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('dist/img'))
});

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('src/*.html', gulp.parallel('html'))
    gulp.watch('src/js/*.js', gulp.parallel('js'))
});
gulp.task('build', gulp.series('clean', 'export'));
gulp.task('default', gulp.parallel('css', 'scss', 'js', 'script', 'browser-sync', 'watch'));