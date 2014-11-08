'use strict';
// var dotenv = require('dotenv');
// dotenv.load();

var gulp = require("gulp");
var sass = require('gulp-sass');
var gulpJade = require('gulp-jade');
var jade = require('jade');
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConf = require("./webpack.config.js");

var markdown = require('gulp-markdown');
var wrap = require("gulp-wrap");
var rename = require("gulp-rename");
var del = require('del');
var _ = require('lodash');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var cheerio = require('gulp-cheerio');
var footer = require('gulp-footer');
var gulpFilter = require('gulp-filter');
var plumber = require('gulp-plumber');

gulp.task('bld', function(done){
  new Workflow({config:'./api.manifest.json', destination: 'dist'})
  .cleanUp()
  .copyIcons()
  .createHomePage()
  .collectMarkdownFiles()
  .markdown2html()
  .copyImages()
  .copyFonts()
  .copyBowerDependencies()
  .addFormating()
  .distributeFiles();

  // var startExpress = require('./server.js');
  // startExpress();
});

// WORKFLOW CONTROLLER

var Workflow = function(options){
  this.config = options.config;
  this.destination = options.destination;

  this.cleanUp = function() {
    del.sync([this.destination + '/*']);
    return this;
  };

  this.copyIcons = function() {
    var config = require(this.config);
    var glob = _.compact(_.map(config, 'icon'));
    glob = _.union(glob, _.compact(_.map(config, 'iconBig')));
    gulp.src(glob, { base: './' })
    .pipe(plumber())
    .pipe(gulp.dest('dist/icons'));
    return this;
  }

  this.createHomePage  = function() {
    var config = require(this.config);
    gulp.src('src/index.jade')
    .pipe(gulpJade({
      locals: {apis: config}
    }))
    .pipe(gulp.dest('dist'));
    return this;
  };

  this.collectMarkdownFiles = function () {
    this.stream =  generateApiDocs(require(this.config));
    return this;
  };

  this.markdown2html = function() {
    var config = require(this.config);
    this.stream = this.stream
    .pipe(markdown(
      {langPrefix: 'language-'}
    ))
    .pipe(cheerio(function($){

      $('blockquote').each(function () {
        $(this).addClass('SamplesAside-sample').addClass('Sample');
      });

      $('img').each(function () {
        $(this).addClass('Typography--img');
      });

      $('h1, h2, h3, h4, h5').each(function () {
        $(this).addClass('Typography--h');
      });

      $('table').each(function () {
        var h = $(this);
        h.addClass('Typography--table');
      });

      $('table').each(function () {
        var h = $(this);
        h.addClass('Typography--table');
      });

      $('tr').each(function () {
        var h = $(this);
        h.addClass('Typography--row');
      });

      $('th').each(function () {
        var h = $(this);
        h.addClass('Typography--cell').addClass('Typography--th');
      });

      $('td').each(function () {
        var h = $(this);
        h.addClass('Typography--cell').addClass('Typography--td');
      });

      $('pre').each(function(){
        $(this).addClass('u-marginAuto')
      });


    }));
    return this;
  };
  this.copyImages = function() {
    gulp.src('src/images/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/images'));
    return this;
  };

  this.copyFonts = function() {
    gulp.src('src/fonts/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/fonts'));
    return this;
  };

  this.copyBowerDependencies = function() {
    gulp.src('bower_components/**')
    .pipe(plumber())
    .pipe(gulp.dest('dist/bower_components'));
    return this;
  };

  this.addFormating = function() {
    buildCss();
    buildJs();
    // var mdFilter = gulpFilter('*.md');
    this.stream =  this.stream
    .pipe(wrap(jade2html('./src/docs-template.jade')));
    // .pipe(mdFilter.restore());
    return this;
  };


  this.distributeFiles = function() {
    var htmlFilter = gulpFilter('**/*.html');
    this.stream.pipe(htmlFilter)
    .pipe(rename(function(path){
      path.dirname = path.basename;
      path.basename = 'index';
      path.extname = ".html";
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist'));
    return this;
  };

  this.moveAllDocsAssest = function() {

  };

};

// HELPER FUNCTIONS

var generateApiDocs = function(apiManifest, output, apiManifestCached) {
  if (apiManifestCached === undefined) {
    apiManifestCached = apiManifest;
  }

  if (apiManifest.length > 0) {
    var item = _.first(apiManifest);
    var apiInfo = {
      item: item,
      manifest: apiManifestCached
    };
    var mdFilter = gulpFilter('*.md');
    var stream = gulp.src(item.glob)
    .pipe(mdFilter)
    .pipe(concat(item.url+'.md'))
    .pipe(footer(
      '<script>window.apiInfo = '
      + JSON.stringify(apiInfo)
      + '</script>'
    ))
    .pipe(mdFilter.restore());
    if (output !== undefined) {
      stream = merge(stream, output);
    }
    return generateApiDocs(_.rest(apiManifest), stream, apiManifestCached);
  }
  else {
    return output;
  }
};

var jade2html = function(jadeFile) {
  return jade.renderFile(jadeFile);
};

var buildCss = function() {
  gulp.src('./src/styles/main/screen.scss')
  .pipe(sass())
  .pipe(gulp.dest('./dist'));
};

var buildJs = function() {
  webpack(
    webpackConf,
    function(err, stats) {
      if(err) {throw new gutil.PluginError("webpack", err);}
      gutil.log("[webpack]", stats.toString({
          // output options
      }));
  });
};
