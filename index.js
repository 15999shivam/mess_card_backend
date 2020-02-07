const express = require("express");
const app = express();
// const schedule = require("node-schedule");
var CronJob = require("cron").CronJob;
require("./modals/dbconnection");
const User = require("./routes/User");
const UserModal = require("./modals/User");
app.use(express.json());
app.use(User);
app.get("/", (req, res) => {
  // console.log("incoming req");
  res.send("Hello World");
});

const port = process.env.PORT || 3000;

new CronJob(
  "0 0 0 1 * *",
  async function() {
    console.log("today is 1");
    UserModal.find({}, (err, users) => {
      let myarray = new Array(31);
      for (i = 0; i < 31; i++) {
        myarray[i] = new Array(5);
        for (let j = 0; j < 5; j++) {
          myarray[i][j] = false;
        }
      }
      users.forEach(async user => {
        user.messcard = myarray;
        await user.save();
      });
    });
  },
  true,
  "America/Los_Angeles"
);

app.listen(port, (err, cb) => {
  console.log("App Running On 3000");
});
