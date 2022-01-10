const router = require("express").Router();
const Space = require('../../models/Space.model')
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
        response.data.spaces.forEach((space=>{
            const {id,name} = space
            Space.create({id,name})
            .then(response=>console.log(response))
            .catch(error=>console.log("ERROR EN CREAR SPACES EN BASE DE DATOS",error))
        }))
        res.render('private/spaces',{spaces:response.data.spaces})
    })
    .catch(error=>console.log("ERROR EN GET SPACES API",error))
})

//----GET ONE SPACE"-----//









//------POST TO CREATE A SPACE-----//
// router.post('/profile/spaces',(req,res,next)=>{
//     const accessToken = req.session.currentUser.clickUpAccessToken;
//     const {spaceName} = req.body
//     clickUpApiHandler
//     .createSpace(accessToken)
//     .then(response => {
//         console.log(response)
//     })
//     .catch(error => console.log(error))
// })


module.exports = router;