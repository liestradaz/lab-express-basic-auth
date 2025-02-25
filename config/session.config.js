const session = require("express-session")
const MongoStore = require("connect-mongo")
const mongoose = require("mongoose")

//Middleware
module.exports = app => {
    // required for the app when deployed to Heroku
    app.set("trust poxy", 1)

    // use session
    app.use(session({
        secret: process.env.SESS_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 60000
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/lab-express-basic-auth'
 
            // ttl => time to live
            // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
        })
    }))
}