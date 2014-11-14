var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');

var getKitData = function(kitName) {
  return _.find(yaml.safeLoad(fs.readFileSync('config/kits.yml', 'utf8')), {
    'name': kitName
  });
};

module.exports = {
  consts: {
    DESTINATION: 'dist',
    TEMP_FOLDER: 'tmpDocs'
  },
  getApis: function() {
    return _.map(require('./config/api.manifest.json'), function(doc) {
      var prefix;
      KitData = getKitData(doc.kit);
      prefix = (doc.internal === true ? "internal" : "released");
      doc.url = prefix + '/' + doc.relativeURL;
      doc.icon = KitData.icon;
      return doc;
    });
  }
};
