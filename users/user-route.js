const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //added 
const secrets = require("../auth-n-middleware/secret"); //added
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

userRouter.get("/user", (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        // res.send("Hey there");
        // console.log(token);
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if (err) {
              res.status(401).json({ message: "Something went wrong"})
          } else {
              req.user = {
                  username: decodedToken.username,
              }
            //    console.log(req.user);
            //    res.send(req.user);
        Users.findBy(req.user)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ message: "We could not find that user at this time."})) 

          }
      })

    }

})


//   if (token) {


//   } else {
//       res.status(400).json({ message: "no token provided"})
//  }
//     Users.findById(req.user)
//         .then(user => res.status(200).json(user))
//         .catch(err => res.status(500).json({ message: "We could not find that user at this time."}))
// })
//exports
module.exports = userRouter;