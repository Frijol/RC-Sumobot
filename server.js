var ws = require('nodejs-websocket');

var tessel = require('tessel');
var servoLib = require('servo-pca9685');
var servo = servoLib.use(tessel.port['A']);

var port = 8000;

// Create the websocket server, provide connection callback
var server = ws.createServer(function (conn) {
  console.log('Connected to bot!');
  tessel.led[1].output(1);
  // If get a binary stream is opened up
  conn.on('binary', function(stream) {
    // When we get data
    stream.on('data', function(data) {
      // Clean up the data
      var input = data.toString().toLowerCase();
      // Log the data
      console.log(input);
      // Parse the data
      if(input == 'forward\n' || input == 'w\n') {
        forward();
      } else if (input == 'back\n' || input == 's\n') {
        back();
      } else if (input == 'right\n' || input == 'd\n') {
        right();
      } else if (input == 'left\n' || input == 'a\n') {
        left();
      } else {
        stop();
      }
    });
  });

  conn.on("close", function (code, reason) {
      console.log("Connection closed")
  });
}).listen(port);

console.log('Listening on port', port);

function forward() {
  servo.move(1, 1);
  servo.move(2, 0);
}

function back() {
  servo.move(1, 0);
  servo.move(2, 1);
}

function right() {
  servo.move(1, 1);
  servo.move(2, 1);
}

function left() {
  servo.move(1, 0);
  servo.move(2, 0);
}

function stop() {
  tessel.led[0].output(0);
  servo.move(1, 0.5);
  servo.move(2, 0.5);
}
