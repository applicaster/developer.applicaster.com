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
    KitData = getKitData(doc.kit);
    doc.prefix = prefix;
    doc.internal = ('internal' === prefix);
    doc.url = prefix + '/' + doc.relativeURL;
    doc.icon = KitData.icon;
    // remove token notation for end user view
    doc.sanitizedPackage = doc.package.replace("token@", "");
    return doc;
  });
};

module.exports = {
  consts: {
    DESTINATION: 'dist',
    TEMP_FOLDER: 'tmpDocs'
  },
  getApis: function() {
    released = extractManifest('config/api.manifest.released.yml', 'released');
    internal = extractManifest('config/api.manifest.internal.yml', 'internal');
    return _.union(released, internal);
  },
};
