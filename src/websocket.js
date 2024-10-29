// websocket.js
const websocket = require("ws");
const TrapUserController = require("./controllers/trapUser");
const RoomController = require("../src/controllers/room");
const { sendMessage, setWebSocketServer } = require("./messaging");

const initWebSocket = (server) => {
  const wss = new websocket.Server({ server });
  setWebSocketServer(wss);

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
        case "placeTrap": {
          TrapUserController.create(message);
          sendMessage({
            type: "placeTrap",
            location: message.data,
            trapType: message.trapType,
            userId: message.userId,
            roomId: message.roomId,
            level: message.level,
          });
          break;
        }
        case "create_room": {
          RoomController.createRoom()
            .then((room) => {
              sendMessage({
                type: "roomCreated",
                message: "Room created",
                room,
              });
            })
            .catch((error) => console.log(error));
          break;
        }
        case "gameState": {
          sendMessage({
            type: "gameState",
            state: message.state,
          });
          break;
        }
        case "level": {
          sendMessage({
            type: "level",
            level: message.level,
          });
          break;
        }
        default: {
          sendMessage({ type: "error", message: "Unknown message type" });
          break;
        }
      }
    });
  });
};

module.exports = { initWebSocket };
