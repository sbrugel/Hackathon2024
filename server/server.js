const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const axios = require("axios");

// App setup code
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log("Connected to DB");

// Schema for a registered user
const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    password: String,
    completedFullSets: [Number], // IDs of problem sets that the user has completed (100%)
    completedPartSets: [Number], // IDs of problem sets that the user has completed partially (attempted but not 100%),
    avatarURL: String
});

// Schema for an entry in the leaderboard of a problem set
const leaderboardEntrySchema = new mongoose.Schema({
    userId: Number,
    score: Number, // TODO: percent? points?
    time: Number // TODO may need to change this type
});

// Schema for a leaderboard of entries, for a specific problem set
const leaderboardSchema = new mongoose.Schema({
    id: Number, // should match the problem set ID
    entryIDs: [Number] // IDs of the leaderboard entries
});

// Schema for a single problem
const problemSchema = new mongoose.Schema({
    id: Number,
    body: String,
    answer: Number
});

// Schema for a problem set
const problemSetSchema = new mongoose.Schema({
    id: Number,
    name: String,
    authorID: Number, // the ID of the creator
    problemIDs: [Number], // IDs of problems to include
    category: String // grade level, will be implemented in front end.
});

// Models
const User = new mongoose.model("User", userSchema);
const LeaderboardEntry = new mongoose.model(
    "LeaderboardEntry",
    leaderboardEntrySchema
);
const Leaderboard = new mongoose.model("Leaderboard", leaderboardSchema);
const Problem = new mongoose.model("Problem", problemSchema);
const ProblemSet = new mongoose.model("ProblemSet", problemSetSchema);

/*
USER ENDPOINTS
- register
- login
*/
app.post("/register", (req, res) => {
    const { name, password } = req.body;
    User.findOne({ name: name })
        .exec()
        .then(async (user) => {
            if (user) {
                res.send({
                    message:
                        "ERROR: A user with name " + name + " already exists."
                });
            } else {
                let id = 0;
                let foundNewID = false; // TODO: this is inefficient as shit lol
                do {
                    id++;
                    await User.findOne({ id: id })
                        .exec()
                        .then((user) => {
                            if (!user) foundNewID = true;
                        });
                } while (!foundNewID);

                const user = new User({
                    id,
                    name,
                    password,
                    completedFullSets: [],
                    completedPartSets: [],
                    avatarURL: "" // TODO: set to a random one that Conor finds
                });
                user.save()
                    .then(() => {
                        res.send({
                            message: name + " has been registered! Welcome!"
                        });
                    })
                    .catch((err) => {
                        res.send("An error occurred: " + err);
                    });
            }
        });
});

app.post("/login", (req, res) => {
    const { name, password } = req.body;
    User.findOne({ name: name })
        .exec()
        .then((user) => {
            if (user) {
                if (password === user.password) {
                    res.send({ message: "Login succeeded!", user: user });
                } else {
                    res.send({ message: "ERROR: Wrong credentials!" });
                }
            } else {
                res.send({ message: "ERROR: User doesn't exist!" });
            }
        });
});

app.listen(port, () => {
    console.log("Server is now started");
});
