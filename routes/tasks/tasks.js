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

    console.log("ID DE LA LISTA DE ESTA TAREA!!!!!!!!",id)

    let taskOnDB;

    //CLICKUP API HANDLER STARTS HERE
    clickUpApiHandler
    .getTasks(id,accessToken) //WE pass the ID of the list from the database
    .then(response=>{
        console.log("RESPONSE:DATA FROM TASKS",response.data) //We recieve al th data from api call
        //Now we neet to iterate in each of the tasks to make sure they are on our database and if they are, do not add the, again

        const arrayOfTasks = response.data;

        console.log("RESPONSE:DATA FROM ARRAYYY",arrayOfTasks)

        response.data.tasks.forEach((task => {
            //console.log("RESPONSE OF FOREACH TASK ID:", task.id)
            //console.log("RESPONSE OF FOREACH TASK assignees:", task.assignees)
            const {id,name,...rest} = task

            let due_date = task.due_date

        
            // EXTRACTING DATE
            console.log("DUE DATE FIRST", due_date)
            let date = new Date(Number(due_date))
            console.log("new DATE", date)
            let dueDate = date.toLocaleDateString()
            console.log("DUE DATE TO LOCALSTRING",dueDate)
            

            Task.find({name: {$eq:name}})
            .then(response => {
                console.log("RESPONSE FROM LIST.FINDONE",response)
                if(!response.length){
                    Task.create({id,name,dueDate})
                    .then(response => {
                        console.log('We created a newTask',response)
                    })
                    .catch(error => console.log("ERROR EN ADDING A TASK ON DB",error))
                } else {
                    console.log("This Task is already on db")
                }
            })
            .catch(error => console.log("ERROR EN FINDING TASKS IN DB",error))
        }))
        // console.log("TASK ON DB ARRAY",taskOnDB)
        res.render('private/tasks',{tasks: response.data.tasks,id,taskArray: taskOnDB})
    })
    .catch(error => console.log("ERROR EN GET TASKS API",error))
})


//-------POST ROUTES------///

router.post('/profile/tasks/:id',(req,res,next)=>{
    const assigneesArray = [];
    const accessToken = req.session.currentUser.clickUpAccessToken;
    const {id} = req.params;
    const {taskName,assignee,priority,dueDate} = req.body;
    const priorityNumber = Number(priority)
    assigneesArray.push(assignee)

    const date = new Date(dueDate)
    const dateInMilliseconds = date.getTime()

    console.log("DATE IN MILLISECONDS",dateInMilliseconds)

    console.log("REQ. BODY de CREAR TASK",req.body)
    console.log("assigneesArray",assigneesArray)
    console.log("priorityNumberr",priorityNumber)

    clickUpApiHandler
    .createTask(id,accessToken,taskName,assigneesArray,priorityNumber,dateInMilliseconds)
    .then(response => {
        res.redirect('back')
    })
    .catch(error => console.log("ERROR EN CREAR TAREA",error))
})



//-------DELETE ROUTES------///
router.get('/profile/tasks/:id')

module.exports = router;