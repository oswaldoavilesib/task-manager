const router = require("express").Router();
const Task = require('../../models/Task.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();



//-------DELETE ROUTES------///

//Delete a task//
router.get('/profile/tasks/delete/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken; 
    const {id} = req.params

    clickUpApiHandler
    .deleteTask(id,accessToken)
    .then(response => {
        console.log("RESPONSE DEL DELETE TASK",response)
        res.redirect('back')
    })
    .catch(error=>console.log("ERROR EN DELETE TASKS",error))
})



//Delete a lsit//
router.get('/profile/list/delete/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken; 
    const {id} = req.params

    clickUpApiHandler
    .deletelist(id,accessToken)
    .then(response => {
        console.log("RESPONSE DEL DELETE LIST",response)
        res.redirect('back')
    })
    .catch(error=>console.log("ERROR EN DELETE LIST",error))
})

module.exports = router;