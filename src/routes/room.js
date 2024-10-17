const route = require("express").Router();
const RoomController = require("../controllers/room");

route.post("/create", RoomController.create);
route.post("/userJoin", RoomController.userJoin);

module.exports = route;
