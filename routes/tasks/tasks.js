const router = require("express").Router();
const Task = require('../../models/Task.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL TASKS FROM A LIST"-----//
router.get('/profile/tasks/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken; 
    const {id} = req.params // We get the ID of the LIST from our DB
    console.log("PRIMER ID",id)

    //CLICKUP API HANDLER STARTS HERE
    clickUpApiHandler
    .getTasks(id,accessToken) //WE pass the ID of the list from the database
    .then(response=>{
        console.log("RESPONSE:DATA FROM TASKS",response.data) //We recieve al th data from api call


        //Now we neet to iterate in each of the tasks to make sure they are on our database and if they are, do not add the, again
        response.data.tasks.forEach((task => {
            // console.log("ASSIGNESS FROM TASKS",task.assignees)

            // console.log("CHECKLISTS FROM TASKS",task.checklists)
            const {id,name,...rest} = task
            id = Number(id)
            console.log("ID EN GETING EACH TASK",id)
            Task.find({id: {$eq:id}})
            .then(response => {
                console.log("RESPONSE FROM LIST.FINDONE",response)

            })
            .catch(error => console.log("ERROR EN FINDING TASKS IN DB",error))
        }))
        res.render('private/tasks',{tasks: response.data.tasks,id})
    })
    .catch(error => console.log("ERROR EN GET TASKS API",error))
})


//-------POST ROUTES------///

router.post('/profile/tasks/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken;
    const {id} = req.params;
    const {taskName} = req.body;

    clickUpApiHandler
    .createTask(id,accessToken,taskName)
    .then(response => {
        res.redirect('back')
    })
    .catch(error => console.log("ERROR EN CREAR TAREA",error))
})



//-------DELETE ROUTES------///
router.get('/profile/tasks/:id')

module.exports = router;