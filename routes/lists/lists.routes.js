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

        //Adding to DB
        response.data.lists.forEach((list => {
            const {id,name,...rest} = list;
            List.find({id: {$eq:id}})
            .then(response => {
                if(!response.length){
                    List.create({id,name})
                    .then(response => console.log(response))
                    .catch(error => console.log("ERROR EN CREAR LISTS EN DB", error))
                } else {
                    console.log("list is alreado on DB")
                }
            })
            res.render("private/lists");
        }))
    })
    .cath(error => console.log("ERROR EN GET LISTS ROUTE",error))
});








module.exports = router;