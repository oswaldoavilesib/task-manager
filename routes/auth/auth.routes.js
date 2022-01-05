const router = require("express").Router();


//----SIGN UP PAGE ROUTES----//
/* GET signup page */
router.get("/signup", (req, res, next) => {

    res.render("auth/signup");
});







//----LOGIN PAGE ROUTES----//
/* GET LOGIN page */
router.get("/login", (req, res, next) => {

    res.render("auth/login");
});


//----ABOUT US PAGE ROUTES----//
/* GET ABOUT US page */

module.exports = router;
