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
        res.render('private/update',{tasks:response,id})
    })
    .catch(error=>console.log("ERROR EN FIND TASK TO EDIT",error))
})

router.post('/profile/tasks/update/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken; 
    const assigneesArray = [];
    const {id} = req.params;
    const {taskName,assignee,priority,dueDate} = req.body;
    const priorityNumber = Number(priority)
    assigneesArray.push(assignee)

    const dueDateClass = new Date(dueDate)

    const dateInMilliseconds = dueDateClass.getTime()


    clickUpApiHandler
    .updateTask(id,accessToken,taskName,assigneesArray,priorityNumber,dateInMilliseconds)
    .then(response => {
        const listID = response.data.list.id
        res.redirect(`/profile/tasks/${listID}`)
    })
    .catch(error=>console.log("error en UPDATE Tarea",error))
})





module.exports = router;