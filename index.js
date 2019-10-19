const express = require("express");
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());


const port = 1950;

server.listen(port, () => {
    console.log(`Game on on ${port}`)
})

server.get("/", (req, res) => {
    res.send("Woohoo! Game on!")
})