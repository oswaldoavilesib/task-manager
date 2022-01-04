const router = require("express").Router();

/* GET signup page */
router.get("/signup", (req, res, next) => {

    res.render("auth/signup");
});

module.exports = router;
