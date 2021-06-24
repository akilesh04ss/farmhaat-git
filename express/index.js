const express = require("express");
const route = require("./routeex");
const app = express();
const router = express.Router();

const cors = require("cors");
// const router = require("./route");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.use("/farmhaat", route);
app.listen(2000, () => {
  console.log("port working in 2000");
});
mongoose.set("useCreateIndex", true);
mongoose.connect(
  "mongodb://localhost:27017/register",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("db connected");
  }
);
