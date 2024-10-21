const websocket = require("ws");

let wss;
const initWebSocket = (server) => {
  if (wss) {
    wss.close(); // Fermer une instance existante si elle est encore active
  }
  wss = new websocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Un utilisateur est connecté");
    ws.send(JSON.stringify({ message: "Bienvenue sur le serveur" }));

    ws.on("disconnect", (data) => {
      console.log("Un utilisateur s'est déconnecté : ", data);
    });
    ws.on("message", (data) => {
      const message = JSON.parse(data);
      console.log(message);
      switch (message.type) {
      }
    });
  });
};

const sendMessage = (data) => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log("Sending message to client");
        client.send(JSON.stringify(data));
      }
    });
  } else {
    console.log("WebSocket server is not initialized");
  }
};

module.exports = { initWebSocket, sendMessage };
