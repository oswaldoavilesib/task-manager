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
    .getTeams(accessToken,callback)
    .then(response => {
        console.log(response.data)
        callback = () => {
            return response.data.teams.id
        }
        response.data.teams.forEach((team)=>{
            const {id, name,...rest} = team
            console.log("TE IDAPI=",id)
            Team.find({id: {$eq:id}})
            .then(response => {
                console.log('RESPONSE FROM Team.findOne: ',response)
                if(!response.length){
                    Team.create({id,name})
                    .then(response=>console.log('WE CREATED A TEAM',response))
                    .catch(error=>console.log("ERROR EN CREAR EL  TEAMS:",error))
                } else{
                    console.log("Team is already on DBB")
                }
            })
            .catch(error => console.log("ERROR EN FINDING NEW TEAMS IN DB",error))
        })
        res.render('private/teams',{teams: response.data.teams})
    })
    .catch(error => console.log("ERROR GETTING TEAMS FROM ENDPOINT",error) )
})

module.exports = router;