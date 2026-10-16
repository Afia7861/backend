
const express = require("express");

const app = express();

// Web Server
app.get("/", (req, res) => {
    res.send("Welcome to my Web Server!");
});

// API
app.get("/api/user", (req, res) => {
    res.json({
        id: 1,
        name: "Afia",
        course: "Backend Development"
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
