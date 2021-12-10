const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true,
}); // require socket.io module and pass the http object (server)

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header('Access-Control-Allow-Origin', '*');
  //Quais são os métodos que a conexão pode realizar na API
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

const port = 8080;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/^(?!/socket.io).*/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

io.sockets.on('connection', function (socket) {
  // WebSocket Connection
  var lightvalue = 0; //static variable for current status
  pushButton.watch(function (err, value) {
    //Watch for hardware interrupts on pushButton
    if (err) {
      //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    lightvalue = value;
    LED.writeSync(lightvalue);
    socket.emit('light', lightvalue); //send button status to client
  });
  socket.on('light', function (data) {
    //get light switch status from client
    lightvalue = data;
    if (lightvalue != LED.readSync()) {
      //only change LED if status has changed
      LED.writeSync(lightvalue); //turn LED on or off
      socket.emit('light', lightvalue);
    }
  });
});

process.on('SIGINT', function () {
  //on ctrl+c
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
  process.exit(); //exit completely
});

http.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});
