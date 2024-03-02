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

console.log('Connected to DB');

// Schema for a registered user
const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    password: String,
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
    entries: [Number] // IDs of the leaderboard entries
})

// Schema for a single problem
const problemSchema = new mongoose.Schema({
    id: Number,
    body: String,
    answer: Number,
});

// Schema for a problem set
const problemSetSchema = new mongoose.Schema({
    id: Number,
    name: String,
    author: Number, // the ID of the creator
    problems: [Number], // IDs of problems to include
    category: String,
});

// Models
const User = new mongoose.model("User", userSchema);
const LeaderboardEntry = new mongoose.model("LeaderboardEntry", leaderboardEntrySchema);
const Leaderboard = new mongoose.model("Leaderboard", leaderboardSchema);
const Problem = new mongoose.model("Problem", problemSchema);
const ProblemSet = new mongoose.model("ProblemSet", problemSetSchema);

app.listen(port, () => {
    console.log('Server is now started');
});