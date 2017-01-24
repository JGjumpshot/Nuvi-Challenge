var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 3000;
var app = express();

app.use(bodyParser());
app.use(cors());

app.listen(port, function() {
  console.log('Gonna rock on port ' + port);
})
