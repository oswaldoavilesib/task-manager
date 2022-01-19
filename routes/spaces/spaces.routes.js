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
            Space.find({id: {$eq:id}})
            .then(response=>{
                console.log("RESPONSE OF SPACE.FIND:",response)
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
        res.render('private/spaces',{
            spaces:response.data.spaces,
            id,
        })
    })
    .catch(error=>console.log("ERROR EN GET SPACES API",error))
})

//----POST TO CREATE A NEW SPACE"-----//


router.post('/profile/spaces/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken;
    const {id} = req.params;
    const {spaceName} = req.body;
    console.log("REQ.BODY",req.body)
    console.log("SPACENAME: ",spaceName)

    clickUpApiHandler
    .createSpace(id,accessToken,spaceName)
    .then(response => {
        console.log("RESPONSE OF POST SPACES",response)
        res.redirect('back')
    })
    .catch(error => console.log("ERROR EN CREAR SPACEE",error))
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