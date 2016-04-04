var xhr = require('xhr')
var example = require('./views/example.hbs')

var tx = "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da";
//var query = "https://blockchain.info/rawtx/"+tx+"/$tx_hash";
// var query = "https://api.wheretheiss.at/v1/satellites/25544"

xhr.get('https://api.wheretheiss.at/v1/satellites/25544', function(err, data) {
  if (err) console.log(err) // do something
    var body = JSON.parse(data.body)

  console.log(body)
  document.body.innerHTML = example({ name: "Sattelite " + body.name, lat: body.latitude,lan: body.longitude, });
})
