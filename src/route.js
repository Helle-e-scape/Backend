const authRoutes = require("./routes/auth");
const router = require("express").Router();

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
  res.send("Welcome to the Hell(e)scape App API");
});
module.exports = router;
