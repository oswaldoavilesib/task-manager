const router = require("express").Router();
const Team = require('../../models/Team.model')
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
        response.data.teams.forEach((team)=>{
            const {id, name,...rest} = team
            const isInDB = Team.findOne({id})
            .then(console.log('RESPONSE FROM Team.findOne: ',response)).catch(error => console.log("ERROR EN FINDING NEW TEAMS IN DB",error))
            if (!isInDB){
                Team.create({id,name})
                .then(response=>console.log('WE CREATED A TEAM',response))
                .catch(error=>console.log("ERROR EN FOREACH DE TEAMS:",error))
            }
        })
        res.render('private/teams',{teams: response.data.teams})
    })
    .catch(error => console.log("ERROR GETTING TEAMS FROM ENDPOINT",error) )
})

module.exports = router;