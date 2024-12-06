const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const randomId = require("random-id");
const { userModel } = require("../db/db");

const key = "KAD▓Nih_2q8enudina%d8H@D92q8d#$%^";

let blackList = []; //To store JWT token which havent expired but the user have logged out.

const router = express.Router();

function authenticateJWT(req, res, next) {
  console.group("Authenticating token");
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!blackList.includes(token)) {
      jwt.verify(token, key, (err, result) => {
        if (err) {
          console.log("Unauthorised users.\n" + err);
          console.groupEnd();
          res.status(401).send({ status: "Unauthorised user." });
        } else {
          console.log("Authorised token.");
          console.groupEnd();
          next();
        }
      });
    } else {
      console.log("Black List token. Unauthorised users.\n");
      console.groupEnd();
      res.status(401).send({ status: "Unauthorised user. " });
    }
  } else {
    res.status(401).send({ status: "Unauthorised user.  " });
    console.groupEnd();
  }
}

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.group("Login request recieved from " + email);
  userModel
    .findOne({ email })
    .then((response) => {
      if (response) {
        bcrypt.compare(password, response.password).then((isMatch) => {
          if (isMatch === true) {
            let userInfo = {
              u_id: response.u_id,
              name: response.name,
              email: response.email,
              type: response.type,
            };
            userInfo.accessToken = jwt.sign(userInfo, key, {
              expiresIn: "24h",
            });
            console.log("Login successfull.");
            console.groupEnd();
            res.status(200).send(userInfo);
          } else {
            console.log("Wrong password.");
            console.groupEnd();
            res.status(401).send({ status: "Incorrect email or password." });
          }
        });
      } else {
        console.log("Couldn't find email.");
        console.groupEnd();
        res.status(401).send({ status: "Couldn't find email." });
      }
    })
    .catch((err) => {
      console.log("Something went wrong. \n" + err);
      console.groupEnd();

      res.status(503).send({ status: "Something went wrong. \n" + err });
    });
});
router.post("/register", (req, res) => {
  let userInfo = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userInfo.password, salt, (err, hash) => {
      if (err) {
        console.log("Something went wrong while hashing password.");
        res.status(400).send({ status: "Something went wrong. \n" + err });
      } else {
        userInfo.password = hash;
        switch (userInfo.type) {
          case "Student":
            userInfo.u_id = "S_" + randomId(8, "aA0");
            break;
          case "Employee":
            userInfo.u_id = "E_" + randomId(8, "aA0");
            break;
          default:
            res.status(400).send({ status: "Invalid role. \n" + err });
            break;
        }
        userInfo.type;

        userModel
          .countDocuments({ email: userInfo.email })
          .then((count) => {
            if (count === 0) {
              new userModel(userInfo).save().then(() => {
                console.log("Added a new user successfully.");
                console.log(userInfo);
                res.status(200).send({ status: "Added a new user successfully." });
              });
            } else {
              console.log("Please use different email.");
              res.status(200).send({ status: "Please use different email." });
            }
          })
          .catch((err) => {
            res.status(503).send({ status: "Something went wrong. \n" + err });
          });
      }
    });
  });
});
router.post("/logout", (req, res) => {
  const { token, email } = req.body;
  blackList.push(token); // Push the token in blackList
  console.log("Logout request recieved from " + email);
  res.status(200).send({ status: "Logged out successfully." });
});

module.exports.authRouter = router;
module.exports.authenticateJWT = authenticateJWT;
