const route = require("express").Router();
const RoomController = require("../controllers/room");

route.post("/create", RoomController.create);

module.exports = route;
