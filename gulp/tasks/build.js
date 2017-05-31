'use strict';

var argv = require('yargs').argv;
var gulp  = require('gulp');
var shell = require('shelljs');
var size  = require('gulp-size');

// include paths file
var paths = require('../paths');

// 'gulp site:tmp' -- copies Jekyll site to a temporary directory to be processed
gulp.task('site:tmp', () =>
  gulp.src([paths.sourceFolderName + '/**/*', '!' + paths.sourceDir + paths.assetsFolderName + '/**/*', '!' + paths.sourceDir + paths.assetsFolderName], {dot: true})
    .pipe(gulp.dest(paths.tempDir + paths.sourceFolderName))
    .pipe(size({title: 'Jekyll'}))
);

// 'gulp site' -- builds site with development settings
// 'gulp site --prod' -- builds site with production settings
gulp.task('site', done => {
  if (!argv.prod) {
    shell.exec('bundle exec jekyll build --config _config.yml');
    done();
  } else if (argv.prod) {
    shell.exec('bundle exec jekyll build');
    done();
  }
});

// 'gulp site:check' -- runs Jekyll doctor
gulp.task('site:check', done => {
  shell.exec('bundle exec jekyll doctor');
  done();
});