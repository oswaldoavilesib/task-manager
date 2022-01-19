const router = require("express").Router();
const Task = require('../../models/Task.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//-------   UPDATE ROUTES------///

//GET update uri //
router.get('/profile/tasks/update/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken; 
    const {id} = req.params;
    Task.find({id: {$eq:id}})
    .then(response => {
        console.log("RESPONSE OF FIND TASK TO EDIT",response)
        res.render('private/update',{tasks:response,id})
    })
    .catch(error=>console.log("ERROR EN FIND TASK TO EDIT",error))
})

router.post('/profile/tasks/update/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken; 
    console.log("REQ.BODY DE POST TASK UPDATE",req.body)
    const assigneesArray = [];
    const {id} = req.params;
    const {taskName,assignee,priority,dueDate} = req.body;
    const priorityNumber = Number(priority)
    assigneesArray.push(assignee)

    clickUpApiHandler
    .updateTask(id,accessToken,taskName,assigneesArray,priorityNumber)
    .then(response => {
        console.log("THE RESPONSE OF UPDATE",response)
        res.redirect(`/profile/tasks/${{req.params.id}}`)
    })
    .catch(error=>console.log("error en UPDATE Tarea",error))
})





module.exports = router;