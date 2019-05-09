var express = require('express'); 
var app = express();
app.use(express.static(__dirname + '/_book'));

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

app.use(express.static(__dirname + '/_book'));

app.listen(process.env.PORT || 3000);