// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");


// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs

require("./auth")
const session = require ("express-session")
const passport = require("passport")

function isLoggedIn(req,res,next){
    req.user ? next () : res.sendStatus(401)
}

const hbs = require("hbs");
const app = express();
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());


//Sesion config
require('./config/session.config')(app)

//Serve static files
app.use(express.static('public'));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);


// default value for title local
const projectName = "taskManager";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
const signupRoutes = require("./routes/auth/auth.routes")
const teamRoutes = require("./routes/team/team.routes")
const spacesRoutes = require('./routes/spaces/spaces.routes.js')
const foldersRoutes = require('./routes/folders/folders.routes.js')
const listsRoutes = require('./routes/lists/lists.routes')

app.use("/", index);
app.use("/", signupRoutes);
app.use("/", teamRoutes);
app.use("/", spacesRoutes);
app.use("/", foldersRoutes);
app.use("/", listsRoutes);


app.get("/",(req,res,next)=>{
    res.send('<a href ="/auth/google">Authenticate with Google </a>')
})

app.get("/auth/google",
passport.authenticate("google",{scope:["email","profile"]})
)


app.get ("/google/callback",
passport.authenticate("google",{
    successRedirect:"https://app.clickup.com/api?client_id=MTQ6E6ABG2IQZHO4LSAGYKHKY2HAGWCC&redirect_uri=https://task-managermx.herokuapp.com/profile",
    failureRedirect:"/auth/failure",
})
)

app.get("/auth/failure",(req,res)=>{
    res.send("Something went wrong")
})

app.get("/protected", isLoggedIn,(req,res,net)=>{
    res.send("Hello!")
})


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
