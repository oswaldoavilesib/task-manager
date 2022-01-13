const router = require("express").Router();
const List = require('../../models/List.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL TASKS FROM A LIST"-----//
router.get('/profile/tasks/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken;
    const {id} = req.params

    clickUpApiHandler
    .getLists(id,accessToken)
    .then(response=>{
        console.log(response.data)
        response.data.tasks.forEach((list=>{
            const {id,name} = list;
            list.FIND({id,name})
            .then(response => {
                if(!response.length){
                    List.create({id,name})
                    .then(response => console.log("RESPONSE OF LIST CREATE",response))
                    .catch(error => console.log("ERROR ON LIST CREATE",error))
                } else {
                    console.log("THIS TASK IS ALREADY ON DB")
                }
            })
            .catch(error => console.log("ERROR EN CREAR LISTS EN BASE DE DATOS",error))
        }))
        res.render('private/tasks')
    })
    .catch(error => console.log("ERROR EN GET TASKS API",error))
})


module.exports = router;