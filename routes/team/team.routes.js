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

        console.log('RESPONSE DE TEAMS',response)
        console.log('RESPONSE.DATA DE TEAMS',response.data)
        console.log('CONSOLE TEAMS_ID',response.data.teams.id) //no me da el ID por que es un arreglo, pero no importa. Lo agarró más adelante
        //clickUpApiHandler.getTeamsId(response.data.teams.id)

        //Extraer el id de cada Team y mandar


        //Agregar a bse de datos
        response.data.teams.forEach((team=>{
            const {id, name,...rest} = team
            console.log("THE TEAM=",id)
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
        }))
        res.render('private/teams',{teams: response.data.teams})
    })
    .catch(error => console.log("ERROR GETTING TEAMS FROM ENDPOINT",error) )
})

module.exports = router;