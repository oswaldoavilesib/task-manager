const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL THE TEAMS FORM WORKSPACE"-----//
router.get('/profile/teams',(req,res)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken;
    clickUpApiHandler
    .getTeams(accessToken)
    .then(response => {
        console.log(response.data)
        
        res.render('private/teams',{teams: response.data.teams})
    })
    .catch(error => console.log("ERROR GETTING TEAMS FROM ENDPOINT",error) )
})


//----GET ALL SPACES WORKSPACE"-----//
router.get('/profile/spaces',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken;
    axios.get('https://api.clickup.com/api/v2/team/12602813/space?archived=false',{
        'Authorization': accessToken
    })
    .then(response=>console.log(response.data))
    .catch(error=>console.log("ERROR EN GET SPACES API",error))

    // clickUpApiHandler
    // .getSpaces(accessToken)
    // .then(response=>{
    //     console.log(response.data)
    //     res.render('private/spaces')
    // })
    // .catch(error=>console.log("ERROR EN ENDPOING TO GET SPACES",error))
})

module.exports = router;