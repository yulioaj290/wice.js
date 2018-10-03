const gulp = require('gulp');
const runSequence = require('run-sequence');
const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');
const bump = require('gulp-bump');
const gutil = require('gulp-util');
const git = require('gulp-git');
const fs = require('fs');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const terser = require('gulp-terser');
const minimist = require('minimist');
const args = minimist(process.argv.slice(2), {string: 'git-version', default: {'git-version': 'patch'}});
require('env2')('.env');    // loads all entries into process.env

/**
 * -------- BUILDING CODE [BEGIN] ------->
 *
 * Define initial variables
 */
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

/**
 * Concatenate JS files and transpile to ES5 with Babel
 */
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

/**
 * Minify the code with Terser
 */
gulp.task('minify', function () {
    return gulp.src(gulpDest + 'wice.js')
        .pipe(terser())
        .pipe(rename('wice.min.js'))
        .pipe(gulp.dest(gulpDest));
});

/**
 * Build task that combine compilation and minification
 */
gulp.task('build', ['compile', 'minify']);

/**
 * -------- BUILDING CODE [END] ------->
 */


/**
 * -------- RELEASING TASKS [BEGIN] ------->
 *
 * Bumping version
 */
gulp.task('bump-version', function () {
// We hardcode the version change type to 'patch' but it may be a good idea to
// use minimist (https://www.npmjs.com/package/minimist) to determine with a
// command argument whether you are doing a 'major', 'minor' or a 'patch' change.
    return gulp.src(['./package.json'])
        .pipe(bump({type: args['git-version']}).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

/**
 * update CHANGELOG.md
 */
gulp.task('changelog', function () {
    return gulp.src('CHANGELOG.md', {
            buffer: false
        })
        .pipe(conventionalChangelog({
            preset: 'angular'
        }))
        .pipe(gulp.dest('./'));
});

/**
 * Commit and push changes
 */
gulp.task('commit-changes', function () {
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('push-changes', function (cb) {
    git.push('origin', 'master', cb);
});

/**
 * Creating tag for the current version
 */
gulp.task('create-new-tag', function (cb) {
    var version = getPackageJsonVersion();
    git.tag(version, 'Created Tag for version: ' + version, function (error) {
        if (error) {
            return cb(error);
        }
        git.push('origin', 'master', {args: '--tags'}, cb);
    });

    function getPackageJsonVersion() {
        // We parse the json file instead of using require because require caches
        // multiple calls so the version number won't be updated
        return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    }
});

/**
 * Make release in GitHub
 */
gulp.task('github-release', function (done) {
    conventionalGithubReleaser({
        type: "oauth",
        token: process.env.GITHUB_TOKEN
    }, {
        preset: 'angular'
    }, done);
});

/**
 * Make the final release
 */
gulp.task('release', function (callback) {
    runSequence(
        'bump-version',
        'changelog',
        'commit-changes',
        'push-changes',
        'create-new-tag',
        'github-release',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});

/**
 * -------- RELEASING TASKS [END] ------->
 */



gulp.task('default', ['build', 'release']);
