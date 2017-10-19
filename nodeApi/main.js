var express = require('express');
var app = express();
var fs = require("fs");


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
      
	    
       res.end(JSON.stringify({'Title': 'Roman_Credit Calculator', 'Author': 'Kumaravel Balakayan' , 'Date' : '19/10/2017', 'Version' : '1.0.0'}));
  
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})