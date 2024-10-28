// messaging.js
const websocket = require("ws");

let wss;

const setWebSocketServer = (server) => {
  wss = server;
};

const sendMessage = (data) => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === websocket.OPEN) {
        console.log("Sending message to client");
        client.send(JSON.stringify(data));
      }
    });
  } else {
    console.log("WebSocket server is not initialized");
  }
};

module.exports = { sendMessage, setWebSocketServer };
