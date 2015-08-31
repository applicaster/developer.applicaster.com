import fs from "fs";
import gulp from "gulp";
import _ from "lodash";
import yaml from "js-yaml";
import gulpFilter from "gulp-filter";
import gulpConcat from "gulp-concat";
import gulpCheerio from "gulp-cheerio";
import gulpMarkdown from "gulp-markdown";
import gulpYaml from "gulp-yaml";
import { INTERNAL_FOLDER, PUBLIC_FOLDER , PUBLIC_TOC_JSON, INTERNAL_TOC_JSON, CONTENT_FOLDER } from './src/shared/settings';
import { getFolder } from './src/shared/utils';

const ymlPath = './content/toc.yml';

let toc = yaml.safeLoad(fs.readFileSync(ymlPath, 'utf8'));

let getSection = (isInternal) => {
  return (isInternal) ? INTERNAL_FOLDER : PUBLIC_FOLDER;
};

export default function() {
  gulp.task('default', () => {
    let publicJson = [];
    let internalJson = [];
    let publicTeasers;
    let internalTeasers;
    _.forEach(toc, (product, label) => {
      publicTeasers = [];
      internalTeasers = [];
      _.forEach(product, (pack) => {
        let mdFilter = gulpFilter('**.md');
        gulp.src(`./${CONTENT_FOLDER}/${pack.folder}/**`)
        .pipe(mdFilter)
        .pipe(gulpConcat('index.md'))
        .pipe(gulpMarkdown({langPrefix: 'language-'}))
        .pipe(gulpCheerio(($) => {
          $('img').each(function(index, element) {
            let src =  $(this).attr('src')
            if (_.startsWith(src, './')) {
              $(this).attr('src', `/${getSection(pack.internal)}/${pack.folder}/${src.substring(2)}`);
            }
            if (_.startsWith(src, '/')) {
              $(this).attr('src', `/${getSection(pack.internal)}/${pack.folder}/${src.substring(1)}`);
            }
          });
          $("blockquote").addClass("Typography--blockquote")
          $("img").addClass("Typography--img")
          $("h1").addClass("Typography--h1")
          $("h2").addClass("Typography--h2")
          $("h3").addClass("Typography--h3")
          $("h4").addClass("Typography--h4")
          $("h5").addClass("Typography--h5")
          $("h6").addClass("Typography--h6")
          $("code").addClass("Typography--code")
          $("dt").addClass("Typography--dt")
          $("table").addClass("Typography--table")
          $("table").addClass("Typography--table")
          $("tr").addClass("Typography--row")
          $("th").addClass("Typography--cell").addClass("Typography--th")
          $("td").addClass("Typography--cell").addClass("Typography--td")
          $("pre").addClass("u-marginAuto")
          $("ul").addClass("Typography--ul")
          $("ol").addClass("Typography--ol")
            $(".language-objective-c").addClass("language-objectivec")
          $(".language-objective-c").removeClass("language-objective-c")
        }))
        .pipe(mdFilter.restore())
        .pipe(gulp.dest(`${getFolder(pack)}/${pack.folder}`));
        internalTeasers.push(pack);
        if (!pack.internal) {
          publicTeasers.push(pack);
        }
      })
      if (!_.isEmpty(internalTeasers)) {
        internalJson.push({label, teasers: internalTeasers})
      }
      if (!_.isEmpty(publicTeasers)) {
        publicJson.push({label, teasers: publicTeasers})
      }
    })
    fs.writeFileSync(`${PUBLIC_TOC_JSON}`, JSON.stringify(publicJson));
    fs.writeFileSync(`${INTERNAL_TOC_JSON}`, JSON.stringify(internalJson));
  })
}
