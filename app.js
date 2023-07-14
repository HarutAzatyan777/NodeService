const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const routes = require('./routes');
require('dotenv').config();
const {sequelize} = require('./models');
require('./modules/passport');



const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

// console.log(sequelize, 'sequelizesequelizesequelize')

app.use('/api', routes);

printData = (req, res, next) => {
    console.log("\n==============================")

    console.log(`req.body.username -------> ${req.body.username}`)
    console.log(`req.body.password -------> ${req.body.password}`)

    console.log(`\n req.session.passport -------> `)
    console.log(req.session)

    console.log(`\n req.user -------> `)
    console.log(req.user)

    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`)
    console.log(`req.session.cookie -------> `)
    console.log(req.session.cookie)

    console.log("===========================================\n")

    next()
}

app.use(printData)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});
