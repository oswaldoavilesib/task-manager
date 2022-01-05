const router = require("express").Router();


//----SIGN UP PAGE ROUTES----//
/* GET signup page */
router.get("/signup", (req, res, next) => {

    res.render("auth/signup");
});







//----log in PAGE ROUTES----//

router.get("/signup", (req, res, next) => {

    res.render("auth/signup");
});


module.exports = router;
