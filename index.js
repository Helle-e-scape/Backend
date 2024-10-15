require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db/connect");
const routes = require("./src/route");
const port = 3000;

const app = express();

connectDB(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
