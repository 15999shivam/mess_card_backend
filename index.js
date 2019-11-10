const express = require("express");
const app = express();
require("./modals/dbconnection");
const User = require("./routes/User");

app.use(express.json());
app.use(User);
app.get("/", (req, res) => {
  // console.log("incoming req");
  res.send("Hello World");
});

app.listen(8080, (err, cb) => {
  console.log("App Running On 8080");
});
