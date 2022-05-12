require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const encrypt = require("mongoose-encryption");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.set("useCreateIndex", true);

// function currentTime() {
//   var today = new Date();
//   var time =
//     today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   return time;
// }

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   team: String,
//   levelone: { type: Boolean, default: false },
//   levelonehint: { type: Boolean, default: false },
//   levelonetime: { type: String, default: "" },
//   leveltwo: { type: Boolean, default: false },
//   leveltwohint: { type: Boolean, default: false },
//   leveltwotime: { type: String, default: "" },
//   levelthree: { type: Boolean, default: false },
//   levelthreehint: { type: Boolean, default: false },
//   levelthreetime: { type: String, default: "" },
//   levelfour: { type: Boolean, default: false },
//   levelfourhint: { type: Boolean, default: false },
//   levelfourtime: { type: String, default: "" },
//   levelfive: { type: Boolean, default: false },
//   levelfivehint: { type: Boolean, default: false },
//   levelfivetime: { type: String, default: "" },
//   levelsix: { type: Boolean, default: false },
//   levelsixhint: { type: Boolean, default: false },
//   levelsixtime: { type: String, default: "" },
//   levelseven: { type: Boolean, default: false },
//   levelsevenhint: { type: Boolean, default: false },
//   levelseventime: { type: String, default: "" },
//   leveleight: { type: Boolean, default: false },
//   leveleighthint: { type: Boolean, default: false },
//   leveleighttime: { type: String, default: "" },
//   levelnine: { type: Boolean, default: false },
//   levelninehint: { type: Boolean, default: false },
//   levelninetime: { type: String, default: "" },
//   levelten: { type: Boolean, default: false },
//   leveltenhint: { type: Boolean, default: false },
//   leveltentime: { type: String, default: "" },
//   leveleleven: { type: Boolean, default: false },
//   levelelevenhint: { type: Boolean, default: false },
//   leveleleventime: { type: String, default: "" },
//   leveltwelve: { type: Boolean, default: false },
//   leveltwelvehint: { type: Boolean, default: false },
//   leveltwelvetime: { type: String, default: "" },
//   levelthirteen: { type: Boolean, default: false },
//   levelthirteenhint: { type: Boolean, default: false },
//   levelthirteentime: { type: String, default: "" },
//   levelfourteen: { type: Boolean, default: false },
//   levelfourteenhint: { type: Boolean, default: false },
//   levelfourteentime: { type: String, default: "" },
//   levelfifteen: { type: Boolean, default: false },
//   levelfifteenhint: { type: Boolean, default: false },
//   levelfifteentime: { type: String, default: "" },
// });

// userSchema.plugin(passportLocalMongoose);

// const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// HOME ROUTE

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/home", function (req, res) {
  res.render("home");
});

// REGISTER ROUTE

// app.get("/pagenotreq", function (req, res) {
//   // if (req.user.team == "admin") {
//   //   res.render("register");
//   // } else {
//   //   res.send("Access Denied");
//   // }
//   res.render("pagenotreq");
// });

// app.post("/pagenotreq", function (req, res) {
//   User.register(
//     { username: req.body.username, team: req.body.team },
//     req.body.password,
//     function (err, user) {
//       if (err) {
//         console.log(err);
//         res.redirect("/pagenotreq");
//       } else {
//         passport.authenticate("local")(req, res, function () {
//           res.redirect("/pagenotreq");
//         });
//       }
//     }
//   );
// });

// LOGIN ROUTE

// app.get("/login", function (req, res) {
//   if (req.isAuthenticated()) {
//     // console.log(req.user);
//     res.redirect("/levelone");
//   } else {
//     res.render("login");
//   }
// });

app.get("/team", function (req, res) {
  res.render("team");
});

// app.post("/login", function (req, res) {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//   });

//   req.login(user, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect("/levelone");
//       });
//     }
//   });
// });

// // LEVEL 1

// app.get("/levelone", function (req, res) {
//   const levelOneHint = req.user.levelonehint
//     ? "Hint: Peek through the layers"
//     : "";
//   const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//   const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//   const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//   const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//   const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//   const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//   const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//   const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//   const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//   const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//   const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//   const levelThirteenStatus = req.user.levelthirteen
//     ? "Reached"
//     : "Not Answered";
//   const levelFourteenStatus = req.user.levelfourteen
//     ? "Reached"
//     : "Not Answered";
//   const levelFifteenStatus = req.user.levelfifteen ? "Reached" : "Not Answered";
//   const teamName = req.user.team;

//   res.render("levelone", {
//     team: teamName,
//     hint: levelOneHint,
//     leveltwo: levelTwoStatus,
//     levelthree: levelThreeStatus,
//     levelfour: levelFourStatus,
//     levelfive: levelFiveStatus,
//     levelsix: levelSixStatus,
//     levelseven: levelSevenStatus,
//     leveleight: levelEightStatus,
//     levelnine: levelNineStatus,
//     levelten: levelTenStatus,
//     leveleleven: levelElevenStatus,
//     leveltwelve: levelTwelveStatus,
//     levelthirteen: levelThirteenStatus,
//     levelfourteen: levelFourteenStatus,
//     levelfifteen: levelFifteenStatus,
//   });
// });

// app.post("/levelone", function (req, res) {
//   const correctAnswer = "4096000";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct1");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelone: true, levelonetime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/leveltwo");
//   } else {
//     console.log("try again1");
//     res.redirect("/levelone");
//   }
// });

// app.get("/levelonehint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelonehint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelone");
// });

// // LEVEL 2

// app.get("/leveltwo", function (req, res) {
//   const levelOneStatus = req.user.levelone;

//   if (levelOneStatus) {
//     const levelTwoHint = req.user.leveltwohint
//       ? "Hint: You missed our trailer, probably"
//       : "";
//     const levelOneStatus = req.user.levelone ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("leveltwo", {
//       team: teamName,
//       hint: levelTwoHint,
//       levelone: levelOneStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/levelone");
//   }
// });

// app.post("/leveltwo", function (req, res) {
//   const correctAnswer = "manitou";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct2");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { leveltwo: true, leveltwotime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/levelthree");
//   } else {
//     console.log("try again2");
//     res.redirect("/leveltwo");
//   }
// });

// app.get("/leveltwohint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { leveltwohint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/leveltwo");
// });

// // LEVEL 3

// app.get("/levelthree", function (req, res) {
//   const levelTwoStatus = req.user.leveltwo;
//   if (levelTwoStatus) {
//     const levelThreeHint = req.user.levelthreehint
//       ? "Hint: The box is the key"
//       : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("levelthree", {
//       team: teamName,
//       hint: levelThreeHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/leveltwo");
//   }
// });

// app.post("/levelthree", function (req, res) {
//   const correctAnswer = "459.25";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct3");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelthree: true, levelthreetime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/levelfour");
//   } else {
//     console.log("try again2");
//     res.redirect("/levelthree");
//   }
// });

// app.get("/levelthreehint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelthreehint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelthree");
// });

// // LEVEL 4

// app.get("/levelfour", function (req, res) {
//   const levelThreeStatus = req.user.levelthree;
//   if (levelThreeStatus) {
//     const levelFourHint = req.user.levelfourhint ? "Answer: 1877505" : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("levelfour", {
//       team: teamName,
//       hint: levelFourHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/levelthree");
//   }
// });

// app.post("/levelfour", function (req, res) {
//   const correctAnswer = "1877505";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct4");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelfour: true, levelfourtime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/levelfive");
//   } else {
//     console.log("try again4");
//     res.redirect("/levelfour");
//   }
// });

// app.get("/levelfourhint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelfourhint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelfour");
// });

// // LEVEL 5

// app.get("/levelfive", function (req, res) {
//   const levelFourStatus = req.user.levelfour;
//   if (levelFourStatus) {
//     const levelFiveHint = req.user.levelfivehint
//       ? "Hint: The word you're looking for is the owner's name"
//       : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("levelfive", {
//       team: teamName,
//       hint: levelFiveHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/levelfour");
//   }
// });

// app.post("/levelfive", function (req, res) {
//   const correctAnswer = "269";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct5");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelfive: true, levelfivetime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/levelsix");
//   } else {
//     console.log("try again5");
//     res.redirect("/levelfive");
//   }
// });

// app.get("/levelfivehint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelfivehint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelfive");
// });

// // LEVEL 6

// app.get("/levelsix", function (req, res) {
//   const levelFiveStatus = req.user.levelfive;
//   if (levelFiveStatus) {
//     const levelSixHint = req.user.levelsixhint
//       ? "Hint: The name your're looking for is the base of the image"
//       : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("levelsix", {
//       team: teamName,
//       hint: levelSixHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/levelfive");
//   }
// });

// app.post("/levelsix", function (req, res) {
//   const correctAnswer = "19:30";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct6");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelsix: true, levelsixtime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/levelseven");
//   } else {
//     console.log("try again6");
//     res.redirect("/levelsix");
//   }
// });

// app.get("/levelsixhint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelsixhint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelsix");
// });

// // LEVEL 7

// app.get("/levelseven", function (req, res) {
//   const levelSixStatus = req.user.levelsix;
//   if (levelSixStatus) {
//     const levelSevenHint = req.user.levelsevenhint
//       ? "Hint: Look beyond the image"
//       : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("levelseven", {
//       team: teamName,
//       hint: levelSevenHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/levelsix");
//   }
// });

// app.post("/levelseven", function (req, res) {
//   const correctAnswer = "therealityisanillusion";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct7");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelseven: true, levelsixtime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/leveleight");
//   } else {
//     console.log("try again7");
//     res.redirect("/levelseven");
//   }
// });

// app.get("/levelsevenhint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelsevenhint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelseven");
// });

// // LEVEL 8

// app.get("/leveleight", function (req, res) {
//   const levelSevenStatus = req.user.levelseven;
//   if (levelSevenStatus) {
//     const levelEightHint = req.user.leveleighthint ? "Answer: 9856073kms" : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("leveleight", {
//       team: teamName,
//       hint: levelEightHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/levelseven");
//   }
// });

// app.post("/leveleight", function (req, res) {
//   const correctAnswer = "9856073kms";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct8");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { leveleight: true, leveleighttime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/levelnine");
//   } else {
//     console.log("try again8");
//     res.redirect("/leveleight");
//   }
// });

// app.get("/leveleighthint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { leveleighthint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/leveleight");
// });

// // LEVEL 9

// app.get("/levelnine", function (req, res) {
//   const levelEightStatus = req.user.leveleight;
//   if (levelEightStatus) {
//     const levelNineHint = req.user.levelninehint
//       ? "Hint: An eye for detail would help you look what you're looking for."
//       : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("levelnine", {
//       team: teamName,
//       hint: levelNineHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/leveleight");
//   }
// });

// app.post("/levelnine", function (req, res) {
//   const correctAnswer = "electricitycut";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct9");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelnine: true, levelninetime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/levelten");
//   } else {
//     console.log("try again9");
//     res.redirect("/levelnine");
//   }
// });

// app.get("/levelninehint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelninehint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelnine");
// });

// // LEVEL 10

// app.get("/levelten", function (req, res) {
//   const levelNineStatus = req.user.levelnine;
//   if (levelNineStatus) {
//     const levelTenHint = req.user.leveltenhint ? "Hint: Hovering is fun" : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("levelten", {
//       team: teamName,
//       hint: levelTenHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/levelnine");
//   }
// });

// app.post("/levelten", function (req, res) {
//   const correctAnswer = "c85789";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct10");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelten: true, leveltentime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/leveleleven");
//   } else {
//     console.log("try again10");
//     res.redirect("/levelten");
//   }
// });

// app.get("/leveltenhint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { leveltenhint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelten");
// });

// // LEVEL 11

// app.get("/leveleleven", function (req, res) {
//   const levelTenStatus = req.user.levelten;
//   if (levelTenStatus) {
//     const levelElevenHint = req.user.levelelevenhint
//       ? "Hint: You'd probably have come across this in Interstellar(of course if you like movies)"
//       : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("leveleleven", {
//       team: teamName,
//       hint: levelElevenHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/levelten");
//   }
// });

// app.post("/leveleleven", function (req, res) {
//   const correctAnswer = "del1387";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct11");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { leveleleven: true, leveleleventime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/leveltwelve");
//   } else {
//     console.log("try again11");
//     res.redirect("/leveleleven");
//   }
// });

// app.get("/levelelevenhint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelelevenhint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/leveleleven");
// });

// // LEVEL 12

// app.get("/leveltwelve", function (req, res) {
//   const levelElevenStatus = req.user.leveleleven;
//   if (levelElevenStatus) {
//     const levelTwelveHint = req.user.leveltwelvehint
//       ? "Hint: Knowing Egyptian symbols might help"
//       : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("leveltwelve", {
//       team: teamName,
//       hint: levelTwelveHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/leveleleven");
//   }
// });

// app.post("/leveltwelve", function (req, res) {
//   const correctAnswer = "bethamycharlottesawadammike";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct12");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { leveltwelve: true, leveltwelvetime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/levelthirteen");
//   } else {
//     console.log("try again12");
//     res.redirect("/leveltwelve");
//   }
// });

// app.get("/leveltwelvehint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { leveltwelvehint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/leveltwelve");
// });

// // LEVEL 13

// app.get("/levelthirteen", function (req, res) {
//   const levelTwelveStatus = req.user.leveltwelve;
//   if (levelTwelveStatus) {
//     const levelThirteenHint = req.user.levelthirteenhint
//       ? "Hint: Rail-Fence"
//       : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("levelthirteen", {
//       team: teamName,
//       hint: levelThirteenHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelfourteen: levelFourteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/leveltwelve");
//   }
// });

// app.post("/levelthirteen", function (req, res) {
//   const correctAnswer = "alpha@123";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct13");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelthirteen: true, levelthirteentime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/levelfourteen");
//   } else {
//     console.log("try again13");
//     res.redirect("/levelthirteen");
//   }
// });

// app.get("/levelthirteenhint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelthirteenhint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelthirteen");
// });

// // LEVEL 14

// app.get("/levelfourteen", function (req, res) {
//   const levelThirteenStatus = req.user.levelthirteen;
//   if (levelThirteenStatus) {
//     const levelFourteenHint = req.user.levelfourteenhint
//       ? "Hint: A single key can open multiple doors around here."
//       : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFifteenStatus = req.user.levelfifteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("levelfourteen", {
//       team: teamName,
//       hint: levelFourteenHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfifteen: levelFifteenStatus,
//     });
//   } else {
//     res.redirect("/levelthirteen");
//   }
// });

// app.post("/levelfourteen", function (req, res) {
//   const correctAnswer = "helloworld";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct14");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelfourteen: true, levelfourteentime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/levelfifteen");
//   } else {
//     console.log("try again14");
//     res.redirect("/levelfourteen");
//   }
// });

// app.get("/levelfourteenhint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelfourteenhint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelfourteen");
// });

// // LEVEL 15

// app.get("/levelfifteen", function (req, res) {
//   const levelFourteenStatus = req.user.levelfourteen;
//   if (levelFourteenStatus) {
//     const levelFifteenHint = req.user.levelfifteenhint
//       ? "Hint: भोले बाबा के आशीर्वाद से ASCII85 और पन्ने पता चल गए ||"
//       : "";
//     const levelOneStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelTwoStatus = req.user.leveltwo ? "Reached" : "Not Answered";
//     const levelThreeStatus = req.user.levelthree ? "Reached" : "Not Answered";
//     const levelFourStatus = req.user.levelfour ? "Reached" : "Not Answered";
//     const levelFiveStatus = req.user.levelfive ? "Reached" : "Not Answered";
//     const levelSixStatus = req.user.levelsix ? "Reached" : "Not Answered";
//     const levelSevenStatus = req.user.levelseven ? "Reached" : "Not Answered";
//     const levelEightStatus = req.user.leveleight ? "Reached" : "Not Answered";
//     const levelNineStatus = req.user.levelnine ? "Reached" : "Not Answered";
//     const levelTenStatus = req.user.levelten ? "Reached" : "Not Answered";
//     const levelElevenStatus = req.user.leveleleven ? "Reached" : "Not Answered";
//     const levelTwelveStatus = req.user.leveltwelve ? "Reached" : "Not Answered";
//     const levelThirteenStatus = req.user.levelthirteen
//       ? "Reached"
//       : "Not Answered";
//     const levelFourteenStatus = req.user.levelfourteen
//       ? "Reached"
//       : "Not Answered";
//     const teamName = req.user.team;
//     res.render("levelfifteen", {
//       team: teamName,
//       hint: levelFifteenHint,
//       levelone: levelOneStatus,
//       leveltwo: levelTwoStatus,
//       levelthree: levelThreeStatus,
//       levelfour: levelFourStatus,
//       levelfive: levelFiveStatus,
//       levelsix: levelSixStatus,
//       levelseven: levelSevenStatus,
//       leveleight: levelEightStatus,
//       levelnine: levelNineStatus,
//       levelten: levelTenStatus,
//       leveleleven: levelElevenStatus,
//       leveltwelve: levelTwelveStatus,
//       levelthirteen: levelThirteenStatus,
//       levelfourteen: levelFourteenStatus,
//     });
//   } else {
//     res.redirect("/levelfourteen");
//   }
// });

// app.post("/levelfifteen", function (req, res) {
//   const correctAnswer = "746";
//   const submittedAnswer = req.body.answer;
//   // console.log(req.user);
//   if (correctAnswer == submittedAnswer) {
//     console.log("correct15");
//     var time = currentTime();
//     User.updateOne(
//       { username: req.user.username },
//       { $set: { levelfifteen: true, levelfifteentime: time } },
//       (e, s) => {}
//     );
//     res.redirect("/congrats");
//   } else {
//     console.log("try again15");
//     res.redirect("/levelfifteen");
//   }
// });

// app.get("/levelfifteenhint", function (req, res) {
//   // console.log("hint taken");
//   User.updateOne(
//     { username: req.user.username },
//     { $set: { levelfifteenhint: true } },
//     (e, s) => {}
//   );
//   res.redirect("/levelfifteen");
// });

// CONGRATS PAGE

// app.get("/congrats", function (req, res) {
//   const levelFifteenStatus = req.user.levelfifteen;
//   const teamName = req.user.team;
//   if (levelFifteenStatus) {
//     res.render("congrats", { team: teamName });
//   } else {
//     res.redirect("/levelone");
//   }
// });

// QUALIFICATION PAGE

// app.get("/qualify", function (req, res) {
//   res.render("winners");
// });

// EVENTS PAGE

// app.get("/events", function (req, res) {
//   res.render("events");
// });

// LOGOUT ROUTE

// app.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/");
// });

port = process.env.PORT || 3000;

app.listen(port, function (req, res) {
  console.log("Site is running successfully!");
});
