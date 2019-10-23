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

//routes for posting games, getting games you have created, and getting games in which you are involved...

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

userRouter.get("/mygames", (req, res) => {
    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Something went wrong"})
            } else {
                req.user = {
                    id: decodedToken.id,
                }
              Users.getMyGames(req.user.id)
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

//adding friends to games and get those friends on your screen


userRouter.post("/games/:id/friends", async (req, res) => {
    const {username} = req.body;
    console.log("req body", req.body);
    const { id } = req.params;
    try {
        const friend = await Users.findUserByName(username)
        console.log(friend);

        const added = await Users.addUserToGame(id, friend.id)
        console.log("added", added)

        res.status(200).json({ message: "success"})
    }
    catch (err) { 
        res.status(500).json({message: "contact backend", key: err.message})
    }
})
        
userRouter.get("/games/:id/friends", (req, res) => {
    const { id } = req.params;
    Users.getFriendsInGame(id)
        .then(friends => res.status(200).json(friends))
        .catch(err => res.status(500).json({ message: "get request failed"}))
 })

module.exports = userRouter;