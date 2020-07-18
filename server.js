const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

const port = process.env.PORT || 3001

// Instanced modules
const app = express();

// Middleware - JSON parsing
app.use(express.json());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
// credentials - allows cookies/sessions
// origin - allows requests from localhost3000 * will need to change once deployed

// configuring session
app.use(
    session({
        store: new MongoStore({
            url: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
        }),
        secret: "nosoupforyou",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 1,
        },
    })
);

// sanity check
app.get('/', function (req, res) {
    res.send('Server is up and running');
});

/* API routes */
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/recipes', routes.recipes);

app.listen(port, function () {
    console.log(`Server is running on http://localhost:${port}`);
});