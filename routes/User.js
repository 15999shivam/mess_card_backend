const express = require("express");
const User = require("../modals/User");
const auth = require("../middleware/auth");
const router = express.Router();

//Register a User
router.post("/user/register", async (req, res) => {
  // console.log("imcoming req");
  // console.log(req.body);
  try {
    let user = await User.findOne({
      username: req.body.username
    });
    if (!user) {
      let myarray = new Array(31);
      for (i = 0; i < 31; i++) {
        myarray[i] = new Array(5);
        for (let j = 0; j < 5; j++) {
          myarray[i][j] = false;
        }
      }
      req.body.messcard = myarray;
      user = new User(req.body);

      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({
        user,
        token
      });
    } else {
      //409=already exists
      res.status(409).send({ error: 5 });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: 4 });
  }
});

//Login a user
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({
      user,
      token
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/user/me", auth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
