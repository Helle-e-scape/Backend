const route = require("express").Router();
const AuthController = require("../controllers/auth");

route.post("/register", AuthController.register);

module.exports = route;
