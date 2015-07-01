var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  // res.send('<h1>Express Server</h1>');
  res.sendfile('./index.html');
});

app.use(express.static('.'));

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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
