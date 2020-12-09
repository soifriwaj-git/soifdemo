const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const WebSocketServer = require('websocket').server;
//const PubNub = require('pubnub');
require('dotenv').config();
//let connection = null;

 let server = http.createServer((req,res) =>{
   console.log(`${new Date()} + Request getting hit in the server by ${req.url}`);
 });

server.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});

//http.use(express.static(path.join(__dirname, '/app.html')));

// http.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '/app.html'));
// });

let wsServer = new WebSocketServer({
  httpServer: server
});

wsServer.on('request', (request) =>{
  console.log('Entered here');
    let connection = request.accept(null, request.origin);
    //console.log(connection);
    
// const uuid = PubNub.generateUUID();
// const pubnub = new PubNub({
//   publishKey: "pub-c-0facf106-e6fc-41e3-8422-967f5263984a",
//   subscribeKey: "sub-c-275bcb36-3342-11eb-9d95-7ab25c099cb1",
//   uuid: uuid
// });

// const publishConfig = {
//   channel: "pubnub_onboarding_channel",
//   message: {"sender": uuid, "content": "Hello From Node.js SDK"}
// }

// pubnub.addListener({
//   message: function(message) {
//     console.log(message);
//   },
//   presence: function(presenceEvent) {
//     console.log(presenceEvent);
//   }
// })

// pubnub.subscribe({
//   channels: ["pubnub_onboarding_channel"],
//   withPresence: true,
// });

// pubnub.publish(publishConfig, function(status, response) {
//   console.log(status, response);
// });
// connection.send();


    connection.on("message",(message) =>{
      console.log('Entered into message event');
        console.log(message.utf8Data);
        setInterval(() =>{
          connection.send(`Hi Sending random data to you Client Bro ${Math.random()}`);
        }, 9000);
    });
    
    connection.on("close", function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
    });
});


// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '/app.html'));
// });