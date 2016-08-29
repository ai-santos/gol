var express = require('express');
var pug = require('pug');
var server = express();

//static routes
server.get('/', function(req, res){
  res.send('Hello World!')
});

server.get('/hello/:name', function(req, res){
  res.send('My name is ' + req.params.name);
});

server.get('/users', function(req, res){
  res.json(['aileen', '39', 'syd', '22']);
});

server.get('/todos', function(req, res){
  res.json(['study express routes', 'get some rest', 'transpile server js code to babel']);
});

server.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});