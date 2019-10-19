const express = require("express");
const bcrypt = require("bcryptjs");
const userRouter = express.Router();
const Users = require("./user-model");

//sanity check

userRouter.get("/", (req, res) => {
    res.send("userRouter works");
})

//register and login

userRouter.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;

    Users.add(user)
        .then(saved => res.status(200).json(saved))
        .catch(err => res.status(500).json({ message: "We could not add a new user at this time"}))


})

userRouter.post("/login", (req, res) => {
    res.send("loginz");
})

//exports
module.exports = userRouter;