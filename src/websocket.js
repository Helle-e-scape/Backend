const websocket = require("ws");
const TrapUserController = require("./controllers/trapUser");
const Room = require("./db/models/room");
const RoomController = require("../src/controllers/room");


let wss;
const initWebSocket = (server) => {
  if (wss) {
    wss.close();
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
        case "placeTrap": {
          TrapUserController.create(message);
          sendMessage({ type: "placeTrap", data: message.data });
          break;
        }
        case "create_room": {
          sendMessage({ type: "create_room" });
          // createRoom(); // Pass sendMessage as argument
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

// const createRoom = async () => {
//   try {
//     const code = Math.floor(100000 + Math.random() * 900000);
//     const room = new Room({ code });
//     await room.save();

//     sendMessage({ type: "roomCreated", message: "Room created", room });
//     console.log("Room created");
//   } catch (error) {
//     console.log(error);
//     sendMessage("error", { message: "Internal sserver error" });
//     return error;
//   }
// };

const sendMessage = (data) => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === websocket.OPEN) {
        console.log("Sending message to client");
        if (data.type == "create_room") {
          RoomController.createRoom()
            .then((room) => {
              client.send(
                JSON.stringify({
                  type: "roomCreated",
                  message: "Room created",
                  room,
                })
              );
            })
            .catch((error) => console.log(error));
        }
        client.send(JSON.stringify(data));
      }
    });
  } else {
    console.log("WebSocket server is not initialized");
  }
};

module.exports = { initWebSocket, sendMessage };
