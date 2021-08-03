const express = require('express');
const passport = require("passport");


// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// setup cors middelware
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method");
    
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
//app.use("/api/users", users);

// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Require routes
const etudiantRoutes = require('./src/routes/etudiant.routes')
const profrsseurRoutes = require('./src/routes/profrsseur.routes')
const moduleRoutes = require('./src/routes/module.routes')
const userRoutes = require('./src/routes/user.routes')

// using as middleware
app.use('/api/etudiant', etudiantRoutes)
app.use('/api/professeur', profrsseurRoutes)
app.use('/api/module', moduleRoutes)
app.use('/api/user', userRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
