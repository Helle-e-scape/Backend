const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/room");
const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/room", roomRoutes);

router.get("/", (req, res) => {
  res.send("Welcome to the Hell(e)scape App API");
});
module.exports = router;
