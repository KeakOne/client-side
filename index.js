var xhr = require('xhr')
var example = require('./views/homeview.hbs')
var app = require('express');


var tx = "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da";
//var query = "https://blockchain.info/rawtx/"+tx+"/$tx_hash";
var query = "https://api.wheretheiss.at/v1/satellites/25544"

xhr.get(query, function(err, data) {
  if (err) console.log(err) // do something

  console.log(data.body)
  document.body.innerHTML = example({ name: "fluffy" });
})

app.use('/v1/cats', cats);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
