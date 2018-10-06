const gulp = require('gulp');
const runSequence = require('run-sequence');
const spawn = require('child_process').spawn;
const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');
const bump = require('gulp-bump');
const gutil = require('gulp-util');
const git = require('gulp-git');
const fse = require('fs-extra');
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
    gulpDest = 'wice.js/',
    gulpDestDist = gulpDest + 'dist/',
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
        .pipe(gulp.dest(gulpDestDist));
});

/**
 * Minify the code with Terser
 */
gulp.task('minify', function () {
    return gulp.src(gulpDestDist + 'wice.js')
        .pipe(terser())
        .pipe(rename('wice.min.js'))
        .pipe(gulp.dest(gulpDestDist));
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

function getPackageJsonVersion() {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return fse.readJsonSync('./package.json').version;
}

/**
 * update CHANGELOG.md
 */
gulp.task('changelog', function () {
    return gulp.src('CHANGELOG.md', {
            buffer: true
        })
        .pipe(conventionalChangelog({
            releaseCount: 1
        }))
        .pipe(gulp.dest('./'));

});

/**
 * Commit and push changes
 */
gulp.task('commit-changes', function () {
    var version = getPackageJsonVersion();
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Bumped version number' + version));
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
});

/**
 * Make publish in GitHub
 */
gulp.task('github-publish', function (done) {
    conventionalGithubReleaser({
        type: "oauth",
        token: process.env.GITHUB_TOKEN
    }, {
        preset: 'angular'
    }, done);
});

/**
 * Make the GitHub release
 */
gulp.task('github-release', function (callback) {
    runSequence(
        'bump-version',
        'commit-changes',
        'push-changes',
        'create-new-tag',
        'github-publish',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE TO GITHUB FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});

/**
 * -------- RELEASING TASKS [END] ------->
 */


/**
 * -------- RELEASING NPMJS.COM TASKS [END] ------->
 *
 * Bumping version of dist
 */
gulp.task('bump-version-dist', function () {
// Similar to bump-version
    return gulp.src([gulpDest + './package.json'])
        .pipe(bump({type: args['git-version']}).on('error', gutil.log))
        .pipe(gulp.dest(gulpDest));
});

/**
 * Copy files to dist
 */
gulp.task('prepare-dist', function () {
    fse.copySync('CHANGELOG.md', gulpDest + 'CHANGELOG.md');
    fse.copySync('README.md', gulpDest + 'README.md');
    fse.copySync('LICENSE', gulpDest + 'LICENSE');
});

/**
 * Make publish in npmjs.com
 */
gulp.task('npm-publish', function (done) {
    spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
});

/**
 * Make the NPM release
 */
gulp.task('npm-release', function (callback) {
    runSequence(
        'bump-version-dist',
        'prepare-dist',
        'npm-publish',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE TO NPMJS FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});

/**
 * -------- RELEASING NPMJS.COM TASKS [END] ------->
 */

/**
 * -------- FINAL COMPLETE RELEASING TASKS [BEGIN] ------->
 */

gulp.task('release', function (callback) {
    runSequence(
        'github-release',
        'npm-release',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('COMPLETE RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});

/**
 * -------- FINAL COMPLETE RELEASING TASKS [END] ------->
 */
gulp.task('default', ['build']);
