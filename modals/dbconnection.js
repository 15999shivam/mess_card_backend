const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1:27017/mess_card",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("db connected");
  }
);
