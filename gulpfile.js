var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('scripts', function() {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            module: "amd",
            noImplicitAny: true,
            out: 'global.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', function () {
    // can pass many tasks here as an array
    return gulp.start(['scripts', 'watch']);
});