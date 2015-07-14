var _ = require('underscore');
var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketio(server);

app.get('/', function(req, res){
  res.sendfile('./index.html');
});

app.use(express.static('.'));

var types = [
  'Fire',
  'Medical',
  'Police'
]

var num = 3

function sendNewIncident(data) {
  /* Broadcast new incident to all clients */
  newData = _.extend({
    'type': types[Math.floor(Math.random()*types.length)],
    'status': 'Pending',
    'datetime': new Date().toISOString(),
    'num': num
  }, data)
  io.emit('newIncident', newData);
  num = num + 1
  console.log('sending new incident...');
  console.log(newData);
};

io.on('connection', function(socket){
  socket.on('incident', function (data) {
    console.log('received a new incident');
    sendNewIncident(data);
  });
  console.log('a user connected');
  // setTimeout(function() {sendNewIncident(socket, 3)}, 3000);
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
  console.log('listening on *:' + port);
});
