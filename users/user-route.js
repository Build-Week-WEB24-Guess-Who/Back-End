const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //added 
const secrets = require("../auth-n-middleware/secret"); //added
const userRouter = express.Router();
const Users = require("./user-model");
const generateToken = require("../auth-n-middleware/generateToken");
const validate = require("../auth-n-middleware/validate");

//sanity check

userRouter.get("/", (req, res) => {
    res.send("userRouter works");
})
userRouter.get("/users", (req, res) => {
    Users.getUsers()
        .then(users => res.json(users))
        .catch(err => res.json({ message: "oh noes"}))
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


            if (user && bcrypt.compareSync( password, user.password )) {
                const token = generateToken(user);
                res.status(200).json({
                    message: "Grab some popcorn and enjoy the show...",
                    token, 
                    user
                })
            } else {
                res.status(401).json({ message: "Invalid credentials"})
            }
        })
        .catch(err => res.status(500).json({ message: "We cannot log you in at this time." }))
})

//access user's own information immediately after login

userRouter.get("/user", (req, res) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if (err) {
              res.status(401).json({ message: "Something went wrong"})
          } else {
              req.user = {
                  username: decodedToken.username,
              }
        Users.findBy(req.user)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ message: "We could not find that user at this time."})) 

          }
      })

    }

})

//routes for users' games...

userRouter.post("/games", validate, (req, res) => {
    const { id } = req.user;
    Users.addGame(req.body)
        .then(newGame => res.status(200).json(newGame))
        .catch(newGame => res.status(500).json({ message: "We could not add your user at this time"}))
})

userRouter.get("/games", (req, res) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if (err) {
              res.status(401).json({ message: "Something went wrong"})
          } else {
              req.user = {
                  id: decodedToken.id,
              }
            Users.getGames(req.user.id)
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json({ message: "We could not find that user at this time."})) 

          }
      })

    }
})

//games by id (adding, deleting)

userRouter.get("/games/:id", validate, (req, res) => {
    const { id } = req.params;
    Users.getGameById(id)
        .then(thatGame => {res.status(200).json(thatGame)})
        .catch(err => { res.status(500).json({ message: "We could not find that user at this time."})})
})



userRouter.delete("/games/:id", validate, (req, res) => {
    const { id } = req.params;

    Users.deleteGame(id)
        .then(snaggedIt => {
            if (snaggedIt) {
                res.status(200).json({ message: "delete successful"})
            } else {
                res.status(404).json({ message: "no success"})
            }
        })
})

//adding and deleting friends from games
userRouter.post("/games/:id/friends", validate, (req, res) => {
    const { id } = req.params;
    const friendId = req.body;
    //how do you turn a friend name into an id #???
    Users.addUserToGame(id, friendId)
        .then(yas => res.status(200).json({ message: "yay!"}))
        .catch(err => res.status(500).json({ message: "meh"}))
})



module.exports = userRouter;