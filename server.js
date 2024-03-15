//  npm --version
//  npm init --y
//  npm install express
//  npm install mongoose
//  npm install dotenv
// 

//sudo sometimes need before npm and enter password

// npm install jsonwebtoken
//npm install bcrypt

//Import necessary modules or dependencies
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    if (req.body) {
        console.log("Request body:");
        console.log(req.body);
    }
    next();
});

// Routes
app.use("/api/posts", require("./src/routes/post"));
app.use("/api/users", require("./src/routes/user"));

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen("4000", () => {
            console.log(`Listening on port ${process.env.PORT} and connected to MongoDB`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });