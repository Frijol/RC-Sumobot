// Find the IP address of your Tessel with `tessel wifi -l` and copy it here
var ipAddress = '192.168.128.62';

// Run this file with node once your server is running on Tessel
var ws = require('nodejs-websocket');
var port = 8000;

// Set the binary fragmentation to 1 byte so it instantly sends anything we write to it
ws.setBinaryFragmentation(1);

// When we get a connection
var connection = ws.connect('ws://' + ipAddress + ':' + port, function() {
  console.log('Connected to bot! Control by entering WASD controls. Enter any other key to stop.');
  // Pipe the data to our server
  process.stdin.on('data', function(data) {
    // Send data
    connection.sendBinary(new Buffer(data));
  });
});
