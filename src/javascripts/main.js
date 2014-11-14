// lib
require("energize");
require("jquery_ui");
require("jquery.highlight.js");

(function (global) {
  var content = '';
  $.get( "/access-token", function( data ) {
    window.accessToken = data.accessToken;
    var link = $('a.access_token').attr('href').replace('ACCESSTOKEN', data.accessToken);
    $('a.access_token').attr('href', link);
  });

  if (window.apiInfo || false) {
    for (i = 0; i < apiInfo.manifest.length; i++) {
      content += '<div class="api-link"><a href="/'
        +apiInfo.manifest[i].url
        +'"><div class="api-icon" style="background: url(http://www.gravatar.com/avatar/'+i
        +'?r=PG&s=50&default=identicon);"></div><div class="api-title">'
        +apiInfo.manifest[i].title
        +'</div></a></div>';
    }

  


  }
  $('body').css('opacity', 1);
})(window);

require("jquery.tocify");
window.lunr = require("lunr");
require("prism");

// app
require("./lang");
require("./search");
require("./toc");
