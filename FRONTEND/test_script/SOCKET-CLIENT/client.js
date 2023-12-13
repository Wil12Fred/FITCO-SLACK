const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:5300", {
 transports: ["websocket"],
			extraHeaders: {Authorization: 'Bearer x'}});

ioClient.on("error", (error) => {
	console.log(error);
});

ioClient.on("message", (msg) => console.info(msg));

ioClient.on("notification", (msg) => console.info(msg));

ioClient.on('connect',function(){
	console.log('connect');
	ioClient.emit('register', "10");
});

ioClient.on('disconnect',function(){
	console.log('disconnect');
});
