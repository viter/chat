var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
const sockets = [];
io.on('connection', function (socket) {
	sockets.push(socket.id)
  
  socket.on('new_message', function (data) {
  		console.log("message", data);
	    io.emit('news', { 
	  	id: socket.id,
	  	message: data.message
	  });
  });
  socket.on('disconnect', () => {
  	let index = sockets.indexOf(socket.id);
  	console.log('socket.id', socket.id);
  	console.log('index', index);
  	sockets.splice(index,1);
  	console.log("sockets", sockets)
  })
});