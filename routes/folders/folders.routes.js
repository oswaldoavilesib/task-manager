const router = require("express").Router();
const Space = require('../../models/Space.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const Folders = require('../../models/Folders.models')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL FOLDERS FROM A WORKSPACE"-----//

router.get("/profile/folders", (req, res, next) => {

    res.render("private/folders");
});

router.get('/profile/folders/:id',(req,res,next)=>{
    const {id} = req.params
    const accessToken = req.session.currentUser.clickUpAccessToken;
    console.log('EL ID DEL PARAMETRO',id)
    Space.findOne({id})
    .then(response =>{
        console.log(response)
        console.log(response.id)
        clickUpApiHandler
        .getFolders(response.id,accessToken)
        .then(response => {
            console.log(response)
        })
        .catch(error=>console.log("ERROR EN GET FOLDER PROMISE",error))

    })
    .catch(error=>console.log('EL ERROR EN PARAMS FOLDERS',error))

})

module.exports = router;