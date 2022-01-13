const router = require("express").Router();
const Space = require('../../models/Space.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL TASKS FROM A LIST"-----//
router.get('/profile/tasks',(req,res,next)=>{
    //const accessToken = req.session.currentUser.clickUpAccessToken;
    //const {id} = req.params
    res.render('private/tasks')
})





module.exports = router;