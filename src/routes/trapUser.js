const route = require("express").Router();
const TrapUserController = require("../controllers/trapUser");

route.post("/createTrap", TrapUserController.create);
route.post("/findTrap", TrapUserController.findAll);

module.exports = route;