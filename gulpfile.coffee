_ = require('lodash')
gulp = require 'gulp'
md5 = require('MD5')
bower = require('bower')
gulpFilter = require('gulp-filter')
concat = require('gulp-concat')
q = require('q')
wrap = require('gulp-wrap')
jade = require('jade')
markdown = require('gulp-markdown')
rename = require('gulp-rename')
del = require('del')
sass = require('gulp-sass')
cheerio = require('gulp-cheerio')
gutil = require('gulp-util')
webpack = require('webpack')
webpackConf = require('./config/webpack.config.js')
gulpJade = require('gulp-jade')
dotenv = require('dotenv')
utils = require('./utils')
header = require('gulp-header')

dotenv.load()


gulp.task 'clean',(done) ->
  del([utils.consts.DESTINATION, utils.consts.TEMP_FOLDER], done)

gulp.task 'build', ['clean'], (done)->
  console.log 'building ...'
  options =
    docsManifest: utils.getApis()

  getDocsPackages(options)
  .then(buildCss)
  .then(buildJs)
  .then(copyImages)
  .then(buildEachDoc)

getDocsPackages = (options) ->
  deferred = q.defer()

  docsPackages = _.compact(_.map(options.docsManifest, (docsPackage)->
    pack = md5(docsPackage.url)
    pack += '=' + docsPackage.package.replace('token@', process.env.TOKEN)
    pack
  ))
  bower.commands
  .cache.clean

  bower.commands
  .install(docsPackages, undefined,
    {directory: './', cwd: utils.consts.TEMP_FOLDER}
  )
  .on('end', (installed) ->
    deferred.resolve(options)
  )
  deferred.promise

buildCss =  (options) ->
  deferred = q.defer()
  gulp.src('./src/styles/main/screen.scss')
  .pipe(sass())
  .pipe(gulp.dest(utils.consts.DESTINATION + '/public'))
  .on('end',->
    deferred.resolve(options)
  )
  deferred.promise

buildJs = (options) ->
  deferred = q.defer()
  webpack webpackConf, (err, stats) ->
    throw new gutil.PluginError("webpack", err)  if err
    gutil.log "[webpack]", stats.toString({})
    deferred.resolve(options)
    return

  deferred.promise

copyImages = (options) ->
  deferred = q.defer()
  gulp.src('src/images/**')
  .pipe(gulp.dest(utils.consts.DESTINATION + '/public/images'))
  .on('end',->
    deferred.resolve(options)
  )
  deferred.promise


buildEachDoc = (options) ->
  buildSingleDoc(doc) for doc in options.docsManifest

buildSingleDoc = (doc) ->
  moveToDist(doc)
  .then(concatMarkdown)
  .then(convert2Html)

moveToDist = (doc) ->
  deferred = q.defer()
  gulp.src([utils.consts.TEMP_FOLDER + '/' + md5(doc.url) + '/' + doc.glob])
  .pipe(gulp.dest(utils.consts.DESTINATION + '/' + doc.url))
  .on('end',->
    deferred.resolve(doc)
  )
  deferred.promise

concatMarkdown = (doc) ->
  deferred = q.defer()
  mdFilter = gulpFilter('**.md')
  gulp.src(utils.consts.DESTINATION + '/' + doc.url + '/**')
  .pipe(mdFilter)
  .pipe(concat('index.md'))
  .pipe(mdFilter.restore())
  .pipe(gulp.dest(utils.consts.DESTINATION + '/' + doc.url))
  .on('end',->
    deferred.resolve(doc)
  )
  deferred.promise

convert2Html = (doc) ->
  gulp.src(utils.consts.DESTINATION + '/' + doc.url + '/index.md')
  .pipe(markdown({langPrefix: 'language-'}))
  .pipe cheerio(($) ->
    #
    $.root().prepend(jade2html('src/header.jade', doc))
    #
    $("blockquote").addClass("SamplesAside-sample").addClass "Sample"
    $("img").addClass "Typography--img"
    $("h1, h2, h3, h4, h5").addClass "Typography--h"
    $("dt").addClass "Typography--dt"
    $("table").addClass "Typography--table"
    $("table").addClass "Typography--table"
    $("tr").addClass "Typography--row"
    $("th").addClass("Typography--cell").addClass "Typography--th"
    $("td").addClass("Typography--cell").addClass "Typography--td"
    $("pre").addClass "u-marginAuto"
    $("ul").addClass "Typography--ul"
    # add class for prism.js to detect objective-c highlights
    $(".language-objective-c").addClass "language-objectivec"
    $(".language-objective-c").removeClass "language-objective-c"
    return
  )
  .pipe(wrap(jade2html('./src/docs-template.jade')))
  .pipe cheerio(($) ->
    $('.panelTopic-image').attr('src', '/public/images/icons/' + doc.icon)
    $('.panelTopic-header').html(doc.kit)
    $('.panelTopic-title').html(doc.title)

    if(doc.internal)
      $('.Content').addClass('u-internal')
      $('.PanelTopic-badge').text('Internal')

    if(!doc.splitView)
      $('.SamplesAside-bgChromeHack')
      .removeClass('SamplesAside-bgChromeHack')
      $('.SamplesAside')
      .removeClass('SamplesAside')
      $('.SamplesAside-sample')
      .removeClass('SamplesAside-sample')
  )
  .pipe(gulp.dest(utils.consts.DESTINATION + '/' + doc.url))

jade2html = (jadeFile, options = {}) ->
  jade.renderFile(jadeFile, options)
