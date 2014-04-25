var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jasmine = require('gulp-jasmine'),
    qunit = require('gulp-qunit');

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
gulp.task('application-spec-jasmine', ['scripts'],function() {
    gulp.src('test/jasmine/application-spec.js')
        .pipe(jasmine())
});

gulp.task('integration-spec-qunit', ['scripts'],function() {
    gulp.src("test/qunit/test-runner.html")
        .pipe(qunit());
});

//default task for Travis CI
gulp.task('travis', ['application-spec-jasmine', 'integration-spec-qunit']);

// The default task (called when you run `gulp`)
gulp.task('default', ['travis']);