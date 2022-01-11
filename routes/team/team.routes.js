const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL THE TEAMS FORM WORKSPACE"-----//
router.get('/profile/teams',(req,res)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken;
    clickUpApiHandler
    .getTeams(this.saveAccessToken)
    .then(response => {
        console.log(response.data)
        res.render('private/teams',{teams: response.data.teams})
    })
    .catch(error => console.log("ERROR GETTING TEAMS FROM ENDPOINT",error) )
})

module.exports = router;