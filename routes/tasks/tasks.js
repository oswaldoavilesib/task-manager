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
    .catch(error => console.log("ERROR EN GET TASKS API",error))
})


module.exports = router;