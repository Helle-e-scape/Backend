const route = require("express").Router();
const AuthController = require("../controllers/auth");

route.post("/register", AuthController.register);
route.post("/findById", AuthController.findById);
route.post("/findByIdRoom", AuthController.findByIdRoomId);

module.exports = route;
