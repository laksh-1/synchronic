require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const encrypt = require("mongoose-encryption");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://admin-laksh:S9zcQqCaS6wrHXU@cluster0.xhtzc.mongodb.net/userDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.set("useCreateIndex", true);

function currentTime() {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  team: String,
  levelone: { type: Boolean, default: true },
  levelonehint: { type: Boolean, default: false },
  levelonetime: { type: String, default: "" },
  leveltwo: { type: Boolean, default: false },
  leveltwohint: { type: Boolean, default: false },
  leveltwotime: { type: String, default: "" },
  levelthree: { type: Boolean, default: false },
  levelthreehint: { type: Boolean, default: false },
  levelthreetime: { type: String, default: "" },
  levelfour: { type: Boolean, default: false },
  levelfourhint: { type: Boolean, default: false },
  levelfourtime: { type: String, default: "" },
  levelfive: { type: Boolean, default: false },
  levelfivehint: { type: Boolean, default: false },
  levelfivetime: { type: String, default: "" },
  levelsix: { type: Boolean, default: false },
  levelsixhint: { type: Boolean, default: false },
  levelsixtime: { type: String, default: "" },
  levelseven: { type: Boolean, default: false },
  levelsevenhint: { type: Boolean, default: false },
  levelseventime: { type: String, default: "" },
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// HOME ROUTE

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/home", function (req, res) {
  res.render("home");
});

// REGISTER ROUTE

app.get("/pagenotreq", function (req, res) {
  // if (req.user.team == "admin") {
  //   res.render("register");
  // } else {
  //   res.send("Access Denied");
  // }
  res.render("pagenotreq");
});

app.post("/pagenotreq", function (req, res) {
  User.register(
    { username: req.body.username, team: req.body.team },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/pagenotreq");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/pagenotreq");
        });
      }
    }
  );
});

// LOGIN ROUTE

app.get("/login", function (req, res) {
  if (req.isAuthenticated()) {
    // console.log(req.user);
    res.redirect("/levelone");
  } else {
    res.render("login");
  }
});

app.get("/team", function (req, res) {
  res.render("team");
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/levelone");
      });
    }
  });
});

// LEVEL 1

app.get("/levelone", function (req, res) {
  const levelOneHint = req.user.levelonehint ? "Hint: This is a Hint" : "";
  const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
  const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Yet Here";
  const levelFourStatus = req.user.levelfour ? "Reached" : "Not Yet Here";
  const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Yet Here";
  const levelSixStatus = req.user.levelsix ? "Reached" : "Not Yet Here";
  const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Yet Here";
  const teamName = req.user.team;

  res.render("levelone", {
    team: teamName,
    hint: levelOneHint,
    leveltwo: levelTwoStatus,
    levelthree: levelThreeStatus,
    levelfour: levelFourStatus,
    levelfive: levelFiveStatus,
    levelsix: levelSixStatus,
    levelseven: levelSevenStatus,
  });
});

app.post("/levelone", function (req, res) {
  const correctAnswer = "levelone";
  const submittedAnswer = req.body.answer;
  // console.log(req.user);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    var time = currentTime();
    User.updateOne(
      { username: req.user.username },
      { $set: { levelone: true, levelonetime: time } },
      (e, s) => {}
    );
    res.redirect("/leveltwo");
  } else {
    console.log("try again1");
    res.redirect("/levelone");
  }
});

app.get("/levelonehint", function (req, res) {
  // console.log("hint taken");
  User.updateOne(
    { username: req.user.username },
    { $set: { levelonehint: true } },
    (e, s) => {}
  );
  res.redirect("/levelone");
});

// LEVEL 2

app.get("/leveltwo", function (req, res) {
  const levelOneStatus = req.user.levelone;

  if (levelOneStatus) {
    const levelTwoHint = req.user.leveltwohint ? "Hint: This is a Hint 2" : "";
    const levelOneStatus = req.user.levelone ? "Reached" : "Not Yet Here";
    const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Yet Here";
    const levelFourStatus = req.user.levelfour ? "Reached" : "Not Yet Here";
    const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Yet Here";
    const levelSixStatus = req.user.levelsix ? "Reached" : "Not Yet Here";
    const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Yet Here";
    const teamName = req.user.team;
    res.render("leveltwo", {
      team: teamName,
      hint: levelTwoHint,
      levelone: levelOneStatus,
      levelthree: levelThreeStatus,
      levelfour: levelFourStatus,
      levelfive: levelFiveStatus,
      levelsix: levelSixStatus,
      levelseven: levelSevenStatus,
    });
  } else {
    res.redirect("/levelone");
  }
});

app.post("/leveltwo", function (req, res) {
  const correctAnswer = "leveltwo";
  const submittedAnswer = req.body.answer;
  // console.log(req.user);
  if (correctAnswer == submittedAnswer) {
    console.log("correct2");
    var time = currentTime();
    User.updateOne(
      { username: req.user.username },
      { $set: { leveltwo: true, leveltwotime: time } },
      (e, s) => {}
    );
    res.redirect("/levelthree");
  } else {
    console.log("try again2");
    res.redirect("/leveltwo");
  }
});

app.get("/leveltwohint", function (req, res) {
  // console.log("hint taken");
  User.updateOne(
    { username: req.user.username },
    { $set: { leveltwohint: true } },
    (e, s) => {}
  );
  res.redirect("/leveltwo");
});

// LEVEL 3

app.get("/levelthree", function (req, res) {
  const levelTwoStatus = req.user.leveltwo;
  if (levelTwoStatus) {
    const levelThreeHint = req.user.levelthreehint
      ? "Hint: This is a Hint 3"
      : "";
    const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
    const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
    const levelFourStatus = req.user.levelfour ? "Reached" : "Not Yet Here";
    const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Yet Here";
    const levelSixStatus = req.user.levelsix ? "Reached" : "Not Yet Here";
    const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Yet Here";
    const teamName = req.user.team;
    res.render("levelthree", {
      team: teamName,
      hint: levelThreeHint,
      levelone: levelOneStatus,
      leveltwo: levelTwoStatus,
      levelfour: levelFourStatus,
      levelfive: levelFiveStatus,
      levelsix: levelSixStatus,
      levelseven: levelSevenStatus,
    });
  } else {
    res.redirect("/leveltwo");
  }
});

app.post("/levelthree", function (req, res) {
  const correctAnswer = "levelthree";
  const submittedAnswer = req.body.answer;
  // console.log(req.user);
  if (correctAnswer == submittedAnswer) {
    console.log("correct3");
    var time = currentTime();
    User.updateOne(
      { username: req.user.username },
      { $set: { levelthree: true, levelthreetime: time } },
      (e, s) => {}
    );
    res.redirect("/levelfour");
  } else {
    console.log("try again2");
    res.redirect("/levelthree");
  }
});

app.get("/levelthreehint", function (req, res) {
  // console.log("hint taken");
  User.updateOne(
    { username: req.user.username },
    { $set: { levelthreehint: true } },
    (e, s) => {}
  );
  res.redirect("/levelthree");
});

// LEVEL 4

app.get("/levelfour", function (req, res) {
  const levelThreeStatus = req.user.levelthree;
  if (levelThreeStatus) {
    const levelFourHint = req.user.levelfourhint
      ? "Hint: This is a Hint 4"
      : "";
    const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
    const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
    const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Yet Here";
    const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Yet Here";
    const levelSixStatus = req.user.levelsix ? "Reached" : "Not Yet Here";
    const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Yet Here";
    const teamName = req.user.team;
    res.render("levelfour", {
      team: teamName,
      hint: levelFourHint,
      levelone: levelOneStatus,
      leveltwo: levelTwoStatus,
      levelthree: levelThreeStatus,
      levelfive: levelFiveStatus,
      levelsix: levelSixStatus,
      levelseven: levelSevenStatus,
    });
  } else {
    res.redirect("/levelthree");
  }
});

app.post("/levelfour", function (req, res) {
  const correctAnswer = "levelfour";
  const submittedAnswer = req.body.answer;
  // console.log(req.user);
  if (correctAnswer == submittedAnswer) {
    console.log("correct4");
    var time = currentTime();
    User.updateOne(
      { username: req.user.username },
      { $set: { levelfour: true, levelfourtime: time } },
      (e, s) => {}
    );
    res.redirect("/levelfive");
  } else {
    console.log("try again4");
    res.redirect("/levelfour");
  }
});

app.get("/levelfourhint", function (req, res) {
  // console.log("hint taken");
  User.updateOne(
    { username: req.user.username },
    { $set: { levelfourhint: true } },
    (e, s) => {}
  );
  res.redirect("/levelfour");
});

// LEVEL 5

app.get("/levelfive", function (req, res) {
  const levelFourStatus = req.user.levelfour;
  if (levelFourStatus) {
    const levelFiveHint = req.user.levelfivehint
      ? "Hint: This is a Hint 5"
      : "";
    const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
    const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
    const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Yet Here";
    const levelFourStatus = req.user.levelfour ? "Reached" : "Not Yet Here";
    const levelSixStatus = req.user.levelsix ? "Reached" : "Not Yet Here";
    const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Yet Here";
    const teamName = req.user.team;
    res.render("levelfive", {
      team: teamName,
      hint: levelFiveHint,
      levelone: levelOneStatus,
      leveltwo: levelTwoStatus,
      levelthree: levelThreeStatus,
      levelfour: levelFourStatus,
      levelsix: levelSixStatus,
      levelseven: levelSevenStatus,
    });
  } else {
    res.redirect("/levelfour");
  }
});

app.post("/levelfive", function (req, res) {
  const correctAnswer = "levelfive";
  const submittedAnswer = req.body.answer;
  // console.log(req.user);
  if (correctAnswer == submittedAnswer) {
    console.log("correct5");
    var time = currentTime();
    User.updateOne(
      { username: req.user.username },
      { $set: { levelfive: true, levelfivetime: time } },
      (e, s) => {}
    );
    res.redirect("/levelsix");
  } else {
    console.log("try again5");
    res.redirect("/levelfive");
  }
});

app.get("/levelfivehint", function (req, res) {
  // console.log("hint taken");
  User.updateOne(
    { username: req.user.username },
    { $set: { levelfivehint: true } },
    (e, s) => {}
  );
  res.redirect("/levelfive");
});

// LEVEL 6

app.get("/levelsix", function (req, res) {
  const levelFiveStatus = req.user.levelfive;
  if (levelFiveStatus) {
    const levelSixHint = req.user.levelsixhint ? "Hint: This is a Hint 6" : "";
    const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
    const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
    const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Yet Here";
    const levelFourStatus = req.user.levelfour ? "Reached" : "Not Yet Here";
    const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Yet Here";
    const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Yet Here";
    const teamName = req.user.team;
    res.render("levelsix", {
      team: teamName,
      hint: levelSixHint,
      levelone: levelOneStatus,
      leveltwo: levelTwoStatus,
      levelthree: levelThreeStatus,
      levelfour: levelFourStatus,
      levelfive: levelFiveStatus,
      levelseven: levelSevenStatus,
    });
  } else {
    res.redirect("/levelfive");
  }
});

app.post("/levelsix", function (req, res) {
  const correctAnswer = "levelsix";
  const submittedAnswer = req.body.answer;
  // console.log(req.user);
  if (correctAnswer == submittedAnswer) {
    console.log("correct6");
    var time = currentTime();
    User.updateOne(
      { username: req.user.username },
      { $set: { levelsix: true, levelsixtime: time } },
      (e, s) => {}
    );
    res.redirect("/levelseven");
  } else {
    console.log("try again6");
    res.redirect("/levelsix");
  }
});

app.get("/levelsixhint", function (req, res) {
  // console.log("hint taken");
  User.updateOne(
    { username: req.user.username },
    { $set: { levelsixhint: true } },
    (e, s) => {}
  );
  res.redirect("/levelsix");
});

// LEVEL 7

app.get("/levelseven", function (req, res) {
  const levelSixStatus = req.user.levelsix;
  if (levelSixStatus) {
    const levelSevenHint = req.user.levelsevenhint
      ? "Hint: This is a Hint 7"
      : "";
    const levelSixHint = req.user.levelsixhint ? "Hint: This is a Hint 6" : "";
    const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
    const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Yet Here";
    const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Yet Here";
    const levelFourStatus = req.user.levelfour ? "Reached" : "Not Yet Here";
    const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Yet Here";
    const levelSixStatus = req.user.levelsix ? "Reached" : "Not Yet Here";
    const teamName = req.user.team;
    res.render("levelseven", {
      team: teamName,
      hint: levelSevenHint,
      levelone: levelOneStatus,
      leveltwo: levelTwoStatus,
      levelthree: levelThreeStatus,
      levelfour: levelFourStatus,
      levelfive: levelFiveStatus,
      levelsix: levelSixStatus,
    });
  } else {
    res.redirect("/levelsix");
  }
});

app.post("/levelseven", function (req, res) {
  const correctAnswer = "levelseven";
  const submittedAnswer = req.body.answer;
  // console.log(req.user);
  if (correctAnswer == submittedAnswer) {
    console.log("correct7");
    var time = currentTime();
    User.updateOne(
      { username: req.user.username },
      { $set: { levelseven: true, levelsixtime: time } },
      (e, s) => {}
    );
    res.redirect("/");
  } else {
    console.log("try again7");
    res.redirect("/levelseven");
  }
});

app.get("/levelsevenhint", function (req, res) {
  // console.log("hint taken");
  User.updateOne(
    { username: req.user.username },
    { $set: { levelsevenhint: true } },
    (e, s) => {}
  );
  res.redirect("/levelseven");
});

// LOGOUT ROUTE

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

port = process.env.PORT || 3000;

app.listen(port, function (req, res) {
  console.log("Site is running successfully!");
});
