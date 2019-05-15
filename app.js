var express = require('express'); 
var app = express();

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' ||
      req.header('host') !== "developer.applicaster.com") {
      res.redirect(`https://developer.applicaster.com${req.url}`)
    } else {
      next()
    }
  })
}

app.use(express.static(__dirname + '/_book'));

app.listen(process.env.PORT || 3000);