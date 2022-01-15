const router = require("express").Router();
const Task = require('../../models/Task.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();



//-------DELETE ROUTES------///
router.get('/profile/tasks/delete/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken; 
    const {id} = req.params

    clickUpApiHandler
    .deleteTask(id,accessToken)
    .then(response => {
        console.log("RESPONSE DEL DELETE",response)
        res.redirect('back')
    })
    .catch(error=>console.log("ERROR EN DELETE TASKS",error))
})

module.exports = router;