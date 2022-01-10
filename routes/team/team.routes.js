const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();

router.get('/profile/teams',(req,res)=>{
    axios.get(`https://api.clickup.com/api/v2/team`,{
        headers: {
            'Authorization': clickUpAccessToken,
        }
    })
    .then(response=>{
        res.render(response)
    })
    //res.render('private/teams')
})



module.exports = router;