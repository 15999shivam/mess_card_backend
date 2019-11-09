const jwt = require("jsonwebtoken");
const User = require("../modals/User");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "messcard");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error({ error: 3 });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(500).send({ error: 4 });
  }
};

module.exports = auth;
