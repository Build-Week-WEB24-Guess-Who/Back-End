const jwt = require("jsonwebtoken");
const secrets = require("./secret.js");

const validate = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "something went wrong"})
            } else {
                req.user = {
                    username: decodedToken.username
                }
                next();
            }
        })
    } else {
        res.status(400).json({ message: "You have not provided a token"})
    }
}

module.exports = validate;