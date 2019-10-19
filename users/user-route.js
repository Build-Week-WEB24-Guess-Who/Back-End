const express = require("express");
const bcrypt = require("bcryptjs");
const userRouter = express.Router();
const Users = require("./user-model");
const generateToken = require("../auth-n-middleware/generateToken");

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
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            // if (user && bcrypt.compareSync(password && user.password)) {
            //     const token = generateToken(user);
            //     res.status(200).json({
            //         message: "Grab some popcorn and enjoy the show...",
            //         token
            //     })
            // } else {
            //     res.status(401).json({ message: "Invalid credentials"})
            // }

            if (user && bcrypt.compareSync( password, user.password )) {
                const token = generateToken(user);
                res.status(200).json({
                    message: "Grab some popcorn and enjoy the show...",
                    token
                })
            } else {
                res.status(401).json({ message: "Invalid credentials"})
            }
                //             const token = generateToken(user);
                // res.status(200).json({
                //     message: "Grab some popcorn and enjoy the show...",
                //     token
                // })
        })
        .catch(err => res.status(500).json({ message: "We cannot log you in at this time." }))
})

//exports
module.exports = userRouter;