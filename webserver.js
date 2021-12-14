const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
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

const Gpio = require('onoff').Gpio; // include onoff to interact with the GPIO

const relayOne = new Gpio(4, 'out'); // relayOne - use GPIO pin 4 as output
const relayTwo = new Gpio(17, 'out'); // relayTwo - use GPIO pin 17 as output
const relayThree = new Gpio(27, 'out'); // relayThree - use GPIO pin 17 as output

const limitSwitchAStart = new Gpio(5, 'in', 'both', { debounceTimeout: 10 }); // use GPIO pin 6 as input, and 'both' button presses, and releases should be handle
const limitSwitchAEnd = new Gpio(13, 'in', 'both', { debounceTimeout: 10 });
const limitSwitchBStart = new Gpio(19, 'in', 'both', { debounceTimeout: 10 });
const limitSwitchBEnd = new Gpio(26, 'in', 'both', { debounceTimeout: 10 });

const port = 8080;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/^(?!/socket.io).*/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

function resetIO() {
  relayOne.writeSync(0); // Turn relayOne off
  relayTwo.writeSync(0); // Turn relayTwo off
  relayThree.writeSync(0); // Turn relayThree off
}

io.sockets.on('connection', function (socket) {
  // WebSocket Connection

  function handleChangeButtons(err, value, name) {
    if (err) {
      console.error('There was an error', err); //output error message to console
      return;
    }
    socket.emit('limitStateChange', { [name]: Boolean(value) });
  }

  // Watch for hardware interrupts on limitSwitchAStart
  limitSwitchAStart.watch(function (err, value) {
    handleChangeButtons(err, value, 'limitSwitchAStart');
  });

  limitSwitchAEnd.watch(function (err, value) {
    handleChangeButtons(err, value, 'limitSwitchAEnd');
  });

  limitSwitchBStart.watch(function (err, value) {
    handleChangeButtons(err, value, 'limitSwitchBStart');
  });

  limitSwitchBEnd.watch(function (err, value) {
    handleChangeButtons(err, value, 'limitSwitchBEnd');
  });

  socket.on('relayStateChange', function (data) {
    if (!!data) {
      if (Number.isInteger(data.relayOne)) {
        relayOne.writeSync(data.relayOne);
        socket.emit('relayStateChange', { relayOne: Boolean(data.relayOne) });
      }
      if (Number.isInteger(data.relayTwo)) {
        relayTwo.writeSync(data.relayTwo);
        socket.emit('relayStateChange', { relayTwo: Boolean(data.relayTwo) });
      }
    }
  });

  socket.on('executeSequence', function (data) {
    console.log('executeSequence', data);
    switch (data) {
      case 'A+':
        relayOne.writeSync(1);
        socket.emit('relayStateChange', { relayOne: true });
        break;
      case 'B+':
        relayTwo.writeSync(1);
        socket.emit('relayStateChange', { relayTwo: true });
        break;
      case 'A-':
        relayOne.writeSync(0);
        socket.emit('relayStateChange', { relayOne: false });
        break;
      case 'B-':
        relayTwo.writeSync(0);
        socket.emit('relayStateChange', { relayTwo: false });
        break;
      case 'A+B+':
        relayOne.writeSync(1);
        relayTwo.writeSync(1);
        socket.emit('relayStateChange', { relayOne: true, relayTwo: true });
        break;
      case 'A-B-':
        relayOne.writeSync(0);
        relayTwo.writeSync(0);
        socket.emit('relayStateChange', { relayOne: false, relayTwo: false });
        break;
      case 'A+B-':
        relayOne.writeSync(1);
        relayTwo.writeSync(0);
        socket.emit('relayStateChange', { relayOne: true, relayTwo: false });
        break;
      case 'A-B+':
        relayOne.writeSync(0);
        relayTwo.writeSync(1);
        socket.emit('relayStateChange', { relayOne: false, relayTwo: true });
        break;
    }
    socket.emit('executedSequence', data);
  });

  socket.on('statesReset', function (data) {
    resetIO();
  });
});

// on ctrl+c
process.on('SIGINT', function () {
  resetIO();
  relayOne.unexport(); // Unexport relayOne GPIO to free resources
  relayTwo.unexport();
  relayThree.unexport();
  limitSwitchAStart.unexport(); // Unexport Button GPIO to free resources
  limitSwitchAEnd.unexport(); // Unexport Button GPIO to free resources
  limitSwitchBStart.unexport(); // Unexport Button GPIO to free resources
  limitSwitchBEnd.unexport(); // Unexport Button GPIO to free resources
  process.exit(); //exit completely
});

http.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});
