var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var io = socketio(http);
var app = express();
var server = http.Server(app);

app.get('/', function(req, res){
  res.sendfile('./index.html');
});

var types = [
  'Fire',
  'Medical',
  'Police'
]

function sendNewIncident(socket, num) {
  socket.emit('newIncident', {
    'type': types[Math.floor(Math.random()*types.length)],
    'status': 'Pending',
    'datetime': new Date().toISOString(),
    'num': num
  });
  console.log('sending new incident...');
};

io.on('connection', function(socket){
  console.log('a user connected');
  setTimeout(function() {sendNewIncident(socket, 3)}, 3000);
  setTimeout(function() {sendNewIncident(socket, 4)}, 8000);
  setTimeout(function() {sendNewIncident(socket, 5)}, 15000);
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:' + port);
});
