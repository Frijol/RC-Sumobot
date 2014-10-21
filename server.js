var ws = require('nodejs-websocket');

var tessel = require('tessel');
var servoLib = require('servo-pca9685');
var servo = servoLib.use(tessel.port['A']);

var wifi = require('wifi-cc3000');
var wifiSettings = {
  ssid: "technicallyWifi",
  password: "scriptstick",
  timeout: 40
};

var port = 8000;

// Workaround: wait 3secs before starting
setTimeout(function () {
  checkConnection();
}, 3000);

function checkConnection () {
  if (wifi.isConnected()) {
    console.log('Connected.');
    createServer();
  } else {
    console.log('Connecting...');
    wifi.connect(wifiSettings, function (err, res) {
      if(err) {
        console.log('Error connecting:', err);
      }
      checkConnection();
    });
  }
}

wifi.on('disconnect', function () {
  console.log('Disconnected.');
  tessel.led[1].output(0);
  checkConnection();
});

// Create the websocket server, provide connection callback
function createServer () {
  tessel.led[0].output(0);
  var blink = setInterval(function() {
    tessel.led[0].toggle();
  }, 500);
  var server = ws.createServer(function (conn) {
    console.log('Connected to bot!');
    clearInterval(blink);
    tessel.led[0].output(1);
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
        console.log("Connection closed.")
        tessel.led[1].output(0);
    });
  }).listen(port);

  console.log('Listening on port', port);
  tessel.led[1].output(1);
}

// Motion functions
function forward() {
  console.log('Moving: forward');
  servo.move(1, 1);
  servo.move(2, 0);
}

function back() {
  console.log('Moving: back');
  servo.move(1, 0);
  servo.move(2, 1);
}

function right() {
  console.log('Moving: right');
  servo.move(1, 0);
  servo.move(2, 0);
}

function left() {
  console.log('Moving: left');
  servo.move(1, 1);
  servo.move(2, 1);
}

function stop() {
  console.log('Stopping.');
  servo.move(1, 0.5);
  servo.move(2, 0.5);
}
