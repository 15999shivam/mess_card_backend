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
  //TODO: prevent inactive users from logginng in
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

//check weather token is valid or not
router.get("/user/auth", auth, (req, res) => {
  console.log("req on auth route");
  let today = new Date();
  let dd = String(today.getDate());
  console.log(dd);
  res.status(200).send({ sucess: 1, day: dd, data: req.user.messcard });
});

//check weather token is valid or not and
router.get("/user/authLocal", auth, (req, res) => {
  console.log("request on authLocal route");
  let today = new Date();
  let dd = today.getDate();
  console.log(dd);
  // console.log(req.user.messcard[dd]);
  res.status(200).send({ sucess: 1, day: dd, data: req.user.messcard[dd - 1] });
});

router.post("/user/checkbox", auth, async (req, res) => {
  console.log(req.body.day);
  let myarray = new Array(31);
  for (i = 0; i < 31; i++) {
    myarray[i] = new Array(5);
    for (let j = 0; j < 5; j++) {
      if (i === req.body.day - 1 && j === req.body.meal) {
        myarray[i][j] = true;
      } else myarray[i][j] = req.user.messcard[i][j];
    }
  }
  req.user["messcard"] = myarray;
  var status = await req.user.save();
  console.log(req.user["messcard"]);
  // console.log(req.user.messcard);
  res.send({ sucess: 1 });
});

module.exports = router;
