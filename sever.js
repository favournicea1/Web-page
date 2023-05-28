if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./db");
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const route = require('./routes/route')
const path = require('path')
const passport = require('passport')
const session = require('express-session');
const { default: mongoose } = require('mongoose');



// database connection
connection()

// middlewares
app.use(express.json());
app.use(cors());

// app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET="MYSECRETKEY_FAVOUROKECHUKWUOBINICE",
    resave: false,
    saveUninitialized: false,
}))

app.use(express.urlencoded({ extended: true}))

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(route)

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening on port ${port}...`))