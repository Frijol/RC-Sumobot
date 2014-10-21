RC-Sumobot
==========

Control a Sumobot over Websockets.

## Materials
* Sumobot wooden parts, like [these](http://sumobotkit.com/)
* [Tessel](//tessel.io)
* [Servo Module](tessel.io/modules#module-servo)
* Two continuous rotation servos.

1. Assemble the Sumobot and connect to Tessel's servo module (module in port A)
2. Connect Tessel to Wifi (change the wifi settings in server.js)
2. Find Tessel's IP address and copy it into client.js
3. Run server.js on Tessel (`tessel run server.js`)
4. Run client.js locally with Node (`node client.js`)
5. Control your Sumobot from the console!

If you get disconnected, close the server and the client, reset the tessel, reconnect to wifi, and try again.
