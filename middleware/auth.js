const jwt = require("jsonwebtoken");
const User = require("../modals/User");
const auth = async (req, res, next) => {
  // console.log(req.body);
  console.log(req.body);
  try {
    let token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, "messcard");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      // throw new Error({ error: 3 });
      return res.status(404).send({ error: 3 });
    }
    //polish and test this req
    //error 6: user is not activated
    if (!user.isactive) {
      return res.status(400).send({ error: 6 });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 4 });
  }
};

module.exports = auth;
