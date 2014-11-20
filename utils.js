var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');

var getKitData = function(kitName) {
  return _.find(yaml.safeLoad(fs.readFileSync('config/kits.yml', 'utf8')), {
    'name': kitName
  });
};

var extractManifest = function(ymlFile, prefix) {
  var internalApis = yaml.safeLoad(fs.readFileSync(ymlFile, 'utf8'));
  return _.map(internalApis, function(doc) {
    // var prefix;
    KitData = getKitData(doc.kit);
    doc.prefix = prefix;
    doc.internal = ('internal' === prefix);
    doc.url = prefix + '/' + doc.relativeURL;
    doc.icon = KitData.icon;
    // remove token notation for end user view
    doc.sanitizedPackage = doc.package.replace("token@", "");
    return doc;
  });
}

module.exports = {
  consts: {
    DESTINATION: 'dist',
    TEMP_FOLDER: 'tmpDocs'
  },
  getApis: function() {
    // manifests = [
    //   {"file": 'config/api.manifest.internal.yml', "prefix": 'internal'},
    //   {"file": 'config/api.manifest.releases.yml', "prefix": 'releases'}
    // ];

    internal = extractManifest('config/api.manifest.internal.yml', 'internal');
    released = extractManifest('config/api.manifest.released.yml', 'released');
    // console.log(_.union(internal, releases));
    return _.union(internal, released);
    // return   releases;
    // return   releases;
    // return _.map(manifests, function(man))
    // var internalApis = yaml.safeLoad(fs.readFileSync('config/api.manifest.internal.yml', 'utf8'));
    // return _.map(internalApis, function(doc) {
    //   var prefix;
    //   KitData = getKitData(doc.kit);
    //   prefix = 'internal';
    //   doc.internal = true;
    //   doc.url = prefix + '/' + doc.relativeURL;
    //   doc.icon = KitData.icon;
    //   // remove token notation for end user view
    //   doc.sanitizedPackage = doc.package.replace("token@", "");
    //   return doc;
    // });
  },
  // getApis1: function() {
  //   return _.map(require('./config/api.manifest.json'), function(doc) {
  //     var prefix;
  //     KitData = getKitData(doc.kit);
  //     prefix = (doc.internal === true ? "internal" : "released");
  //     doc.url = prefix + '/' + doc.relativeURL;
  //     doc.icon = KitData.icon;
  //     return doc;
  //   });
  // }
};
