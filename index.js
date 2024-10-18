require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db/connect");
const routes = require("./src/route");
const port = 3000;
const app = express();
const server = require("http").createServer(app);
const { initWebSocket } = require("./src/websocket");
connectDB(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initWebSocket();

app.use("/", routes);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
