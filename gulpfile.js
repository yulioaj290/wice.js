const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const terser = require('gulp-terser');

const gulpSrc = 'src/app/classes/',
    gulpDest = 'build/js/',
    sourceFiles = [
        gulpSrc + 'CanvasExercise.js',
        gulpSrc + 'AssociateCanvasExercise.js',
        gulpSrc + 'GapMatchCanvasExercise.js',
        gulpSrc + 'OrderCanvasExercise.js',
        gulpSrc + 'PositionObjectCanvasExercise.js',
        gulpSrc + 'script.js'
    ];

gulp.task('compile', function () {
    return gulp.src(sourceFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('wice.js'))
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(gulpDest));
});

gulp.task('minify', function () {
    return gulp.src(gulpDest + 'wice.js')
        .pipe(terser())
        .pipe(rename('wice.min.js'))
        .pipe(gulp.dest(gulpDest));
});

gulp.task('default', ['compile', 'minify']);
