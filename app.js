var redis = require('redis'),
	app = require('http').createServer(),
	io = require('socket.io').listen(app),
	port = 8080,
	pub = redis.createClient(),
	sub = redis.createClient(),
	connect = require('connect');
	

connect.createServer(
    connect.static(__dirname)
).listen(8090);

app.listen(port);

sub.subscribe('Pub');//subscribe to Pub channel
sub.on('message', function (channel, message) {
    console.log(channel + ':' + message);
});

io.sockets.on('connection', function (socket) {
    pub.publish('Pub', 'New Connection');
    pub.incr('Channel Test');   //increment 'Channel Test' but do not publish messages
    pub.incr('Pub');            //increment 'Pub' but do not publish messages
});