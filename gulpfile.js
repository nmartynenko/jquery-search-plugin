var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jasmine = require('gulp-jasmine');

gulp.task('scripts', function() {
    // Minify and copy all JavaScript (except vendor scripts)
    gulp.src('./jquery.search.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
        .pipe(gulp.src([
            'Copyright',
            "build/*.js"
        ]))
        .pipe(concat("jquery.search.min.js", {newLine:""}))
        .pipe(gulp.dest('.'))

});

//perform tests
gulp.task('jasmine', ['scripts'],function() {
    gulp.src('test/testfile.js')
        .pipe(jasmine())
});

//default task for Travis CI
gulp.task('travis', ['jasmine']);

// The default task (called when you run `gulp`)
gulp.task('default', ['travis']);