const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  isactive: {
    type: Boolean,
    default: true //make it false for production
  },
  roomno: {
    type: String,
    required: true
  },
  hostelname: {
    type: String,
    required: true
  },
  messcard: Array, //[[{ type: Boolean, default: false }]],
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// Function for findig user in DB with username password
UserSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw Error(JSON.stringify({ error: 1 }));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Error(JSON.stringify({ error: 2 }));
  }
  return user;
};

//generating auth token for user
UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "messcard");

  //this is for authentication on on device at a time: the previous token will be in valid if user loggs in from a new device each time.
  user.tokens = [];
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//overwriting toJson function for for removing password before send it over to client.
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

UserSchema.pre("save", async function(next) {
  console.log("i am saving the user");
  const user = this;
  console.log(user.messcard);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
