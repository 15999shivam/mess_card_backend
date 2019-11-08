const mongoose = require("mongoose");

const User = mongoose.Schema({
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
    required: true
  },
  messcard: [
    [
      {
        type: Boolean,
        default: false
      }
    ]
  ]
});
