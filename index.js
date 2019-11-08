const express = require("express");
const app = express();
require("./modals/dbconnection");
app.get("/", (req, res) => {
  console.log("incoming req");
  res.send("Hello World");
});

app.listen(8080, (err, cb) => {
  console.log("App Running On 3000");
});
