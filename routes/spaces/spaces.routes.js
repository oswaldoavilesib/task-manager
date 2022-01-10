const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL SPACES WORKSPACE"-----//
router.get('/profile/spaces',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken;

    clickUpApiHandler
    .getSpaces(accessToken)
    .then(response=>{
        console.log(response.data)
        res.render('private/spaces',{spaces:response.data.spaces})
    })
    .catch(error=>console.log("ERROR EN GET SPACES API",error))
})

module.exports = router;