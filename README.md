RC-Sumobot
==========

Control a Sumobot remotely over Websockets.
This is a fun little remote control car. It can run around untethered, using a battery for power.

Your Tessel runs a server that controls the car. You connect to the server from node in your console to command the bot.

See it work [on Vine!](https://vine.co/v/ObTV02AZYh5)

## Materials
### Electronic Parts
* [Tessel](//tessel.io)
* [Servo Module](tessel.io/modules#module-servo)
* Two continuous rotation servos
* A battery (5V/1A)– most convenient if USB (I use [this one](http://www.amazon.com/Ultra-Compact-Portable-Lipstick-Sized-Technology-Smartphones/dp/B00M0OTTG0/ref=sr_1_4?ie=UTF8&qid=1413851941&sr=8-4&keywords=battery+anker))
* Two male to female wires for powering the servo module from Tessel's Vin and Ground
* A 10-pin cable/ten male to female wires for extending the module (optional)

### Mechanical Parts
* Sumobot wooden parts, like [these](http://sumobotkit.com/)
* Two rubber bands, for the tire treads
* A project box like [this one](http://www.radioshack.com/product/index.jsp?productId=2062282)
* Some screws, a drill, a screwdriver

## Mechanical Assembly
1. Put together the sumobot according to the parts you have. The servos should stick out the sides, and the wheels should attach to them.
2. Put rubber bands on the tires (if you have lasercut parts like me) so that it has some traction.
2. Drill a hole in one end of the projects box (this side goes to the back of the bot) that you can stick your servo cables through.
3. Drill some holes in the bottom of the projects box and attach it to the top of the sumobot with screws.
4. Your Tessel, etc. go in the box; your servo cables thread through the hole in the end of the box to get to the servo module.

## Electrical Assembly
0. Unplug power while you're messing with wires. Power always gets plugged in last.
1. Plug your servo module in to Port A on your Tessel. I used extension cables so that I could fit everything into my box better.
2. Plug in your two continuous rotation servos to positions 1 and 2 on your servo module. Remember, the black wire goes to Ground/`-`.
3. This is a little bit hack-y, but we'll get away with it in this application. Since you're powering Tessel from a 5V source (USB from your computer/the specified battery), Vin on the GPIO bank is 5V. Run a red wire from Vin to any of the `+` positions on your servo module (yes, the same kind of pins you plugged the servos into). Also run a wire from GPIO GND to servo module `-`. This means we don't have to plug in the servo module to an external power source like we usually do.
4. Power your Tessel. For now, just plug it in to your computer; after you make sure the code is working, you'll plug it in to your battery.

## Code Setup
1. Clone the repo for this project.
2. In `server.js`, change the settings in the `wifiSettings` object to match the wifi your computer is connected to.
3. If you haven't installed Tessel yet, [go do that](//start.tessel.io).
4. Connect your Tessel to Wifi [in the command line](//start.tessel.io).
5. With Tessel connected, run `tessel wifi -l` to show Tessel's IP address. Copy that IP address into `client.js`, replacing whatever is set as `ipAddress`.
6. Run `npm install` in your command line to make sure you have all the node dependencies you need.

## Test it out
Okay, you should be all plugged in and ready to go! Let's try it out while it's tethered to the computer so that we can see debugging messages in the console if necessary.

(You might want to put your bot's wheels in the air for testing, so it doesn't run away.)

If at any point things don't work as expected, cycle Tessel's power and try again. Also check the wifi settings from the Code Setup section.

1. Start up the server on Tessel first: `tessel run server.js`. Tessel will make sure it's connected to wifi (and reconnect itself if necessary). You can watch the yellow light blink while it's connecting, then turn solid once it's connected. It should also log a message in the console.
1. Tessel will now automatically start a server. The blue light should turn on when the server is running, and the console will log a message.
1. Once the server is running, Tessel will start looking for a client. This is shown with the blinking green light.
1. Your computer is the client: in a separate console window, run `node client.js`. The node program should find Tessel and log a message. Tessel's console window should also log a message, and the green light on Tessel should turn solid.
1. Now you can try it out! In your node console, use WASD commands. For example, press 'w' and then enter to make Tessel go forward. To make Tessel stop, press enter without a specific command, or enter any letter that isn't 'w', 'a', 's', or 'd'.
2. If all of your commands are backwards, swap the positions of servo 1 and 2 on your servo module.

## Deploy
Great! If things were working well in testing, we can deploy and run the Tesselbot remotely.

1. With Tessel plugged in to your computer, run `tessel push server.js`. This deploys the server code to Tessel, so it will run automatically when Tessel is powered.
2. Unplug Tessel from your computer and plug it in to battery power.
3. Watch Tessel's bootup: blinking yellow while connecting, yellow for connected, blue for server running, blinking green when it's waiting for you to connect. (If it's not doing these things, cycle power and see if it works the next time.)
4. From your computer, again run `node client.js` to connect to the Tesselbot. It should acknowledge connection with a green light and in your console.
5. Play with the Tesselbot!

If you need to change your server code and re-deploy, you can run `tessel erase` to erase the code on Tessel.
