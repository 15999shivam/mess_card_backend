const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/mess_card",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("db connected");
  }
);
