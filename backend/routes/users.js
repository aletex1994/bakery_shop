const router = require("express").Router();
let User = require("../models/users.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({ username, password });

  newUser
    .save()
    .then(() => res.json("User successfully added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.find({ username: username, password: password }).then((user) => {
    if (user.length > 0) {
      res.status(200).json("User found");
      return true;
    } else {
      res.status(400).json("User not found");
      return false;
    }
  });
});

module.exports = router;
