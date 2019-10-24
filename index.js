require("dotenv").config();

const express = require("express");
const server = express();
const cors = require("cors");
const userRouter = require("./users/user-route");

server.use(express.json());
server.use(cors());
// server.use("/api", userRouter);

server.use("/api", userRouter);

const port = process.env.PORT;
// const port = 1066;

server.listen(port, () => {
    console.log(`Game on on ${port}`)
})


server.get("/", (req, res) => {
    res.send("Woohoo! Game on!")
})

module.exports = server;