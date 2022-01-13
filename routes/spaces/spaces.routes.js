const router = require("express").Router();
const Space = require('../../models/Space.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL SPACES WORKSPACE"-----//
router.get('/profile/spaces/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken;
    const {id} = req.params

    clickUpApiHandler
    .getSpaces(id,accessToken)
    .then(response=>{
        console.log(response.data)
        response.data.spaces.forEach((space=>{
            const {id,name} = space
            Space.find({id,name})
            .then(response=>{
                if(!response.length){
                    Space.create({id,name})
                        .then(response=>console.log("RESPONSE OF CREATE SPACE",response))
                        .catch(error=> console.log("ERROR EN CREAR SPACES EN DB",error))
                } else {
                    console.log("THIS SPACE IS ALREADY ON DB")
                }
            })
            .catch(error=>console.log("ERROR EN CREAR SPACES EN BASE DE DATOS",error))
        }))
        res.render('private/spaces',{spaces:response.data.spaces})
    })
    .catch(error=>console.log("ERROR EN GET SPACES API",error))
})

//----POST TO CREATE A NEW SPACE"-----//
router.get('/profile/spaces/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken;
    const {id} = req.params

    clickUpApiHandler
    createSpace(id,accessToken)
    .then(response => {
        console.log(response)
        res.redirect('/private/spaces')
    })
    .catch(error = console.log("ERROR EN CREAR SPACE",error))
})








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