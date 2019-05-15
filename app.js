var express = require('express'); 
var app = express();

const { NODE_ENV } = process.env
if(NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next()
    }
  })
}

const { CANONICAL_HOST } = process.env
if (CANONICAL_HOST) {
  app.use((req, res, next) => {
    if (req.header('host') !== CANONICAL_HOST) {
      res.redirect(`https://${CANONICAL_HOST}${req.url}`)
    } else {
      next()
    }
  })
}

app.use(express.static(__dirname + '/_book'));

app.listen(process.env.PORT || 3000);