const router = require("express").Router();
const Space = require('../../models/Space.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const List = require('../../models/Lists.model')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL SPACES WORKSPACE"-----//

router.get("/profile/lists/:id", (req, res, next) => {
    const {id}

    res.render("private/lists");
});








module.exports = router;