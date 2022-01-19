const router = require("express").Router();
const List = require('../../models/List.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL SPACES WORKSPACE"-----//

router.get("/profile/lists/:id", (req, res, next) => {
    const accessToken = req.session.currentUser.clickUpAccessToken;
    const {id} = req.params

    //Clickup API Handler
    clickUpApiHandler
    .getLists(id,accessToken)
    .then(response => {
        console.log("RESPONSE.DATA OF LISTS API",response.data)
        console.log("RETRIEVE FOLDERS DATA FROM LISTS",response.data[0].folder)
        console.log("RETRIEVE FOLDERS DATA FROM LISTS",response.data[0].space)

        //Adding to DB
        response.data.lists.forEach((list => {
            console.log("DATA TYPE FOR ID OF LISTS",typeof list.id)
            const {id,name,...rest} = list;
            List.find({id: {$eq:id}})
            .then(response => {
                console.log("RESPONSE.DATA DE LISTS",response)
                if(!response.length){
                    List.create({id,name})
                    .then(response => console.log("WE CREATED A NEW LIST",response))
                    .catch(error => console.log("ERROR EN CREAR LISTS EN DB", error))
                } else {
                    console.log("list is alreadY on DB")
                }
            })
            .catch(error => console.log("ERROR EN FINDING NEW LIST IN DB",error))
        }))
        res.render("private/lists",{lists: response.data.lists,id});
    })
    .catch(error => console.log("ERROR EN GET LISTS ROUTE",error))
});



//-------POST ROUTES------///

router.post('/profile/lists/:id',(req,res,next)=>{
    const accessToken = req.session.currentUser.clickUpAccessToken;
    const {id} = req.params;
    const {listName} = req.body;

    clickUpApiHandler
    .createList(id,accessToken,listName)
    .then(response => {
        res.redirect('back')
    })
    .catch(error => console.log("ERROR EN CREAR FOLDER",error))
})





module.exports = router;