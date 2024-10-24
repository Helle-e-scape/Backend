const route = require("express").Router();
const RoomController = require("../controllers/room");

route.put("/userJoin", RoomController.userJoin);
route.delete("/delete", RoomController.delete);

module.exports = route;
