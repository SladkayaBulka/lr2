var express = require('express');
var CryptoJS = require('crypto-js');
var fs = require('fs');
//var path = require('path');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var task = require('./routes/tasks');

var content = fs.readFileSync('./public/config.json')
var elements_array = JSON.parse(content);

var port = 3000;

var app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', function(req, res) {
    res.render('index', { random: rnd });
    rnd = getRandomInt(0, elements_array.length);
    key = getKey();
    hash = generatehash(rnd, key).toString();
    rgg = {
        "key": key,
        "rnd": rnd,
        "hash": hash,
        "elem": elements_array[rnd]
    };
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/config.json', urlencodedParser, function(req, res) {
    res.send(elements_array);
})

app.get('/rgg', urlencodedParser, function(req, res) {
    res.send(rgg);
})
app.get('/newRgg', urlencodedParser, function(req, res) {
  rnd = getRandomInt(0, elements_array.length);
  key = getKey();
  hash = generatehash(rnd, key).toString();
  rgg = {
      "key": key,
      "rnd": rnd,
      "hash": hash,
      "elem": elements_array[rnd]
  };
    res.send(rgg);
})

var generatehash = function(numbPc, key) {
    return CryptoJS.HmacSHA256(elements_array[numbPc], key);
}
var getKey = function() {
    return CryptoJS.lib.WordArray.random(16).toString();
}

var rnd = getRandomInt(0, elements_array.length);
var key = getKey();
var hash = generatehash(rnd, key).toString();
var rgg = {
    "key": key,
    "rnd": rnd,
    "hash": hash,
    "elem": elements_array[rnd]
};

//console.log(rgg);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

app.listen(port, function() {
    console.log('Server started on port ' + port);
})
