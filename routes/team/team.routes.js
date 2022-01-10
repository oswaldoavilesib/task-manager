const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();

router.get('/profile/teams',(req,res)=>{
    res.render('private/teams')
})



module.exports = router;