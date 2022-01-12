const router = require("express").Router();
const Space = require('../../models/Space.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const Folders = require('../../models/Folders.models')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----TRYING TO GET THE ID OF AN SPACE FOM A DATABASE TO SENDIT TO THE GETFOLDERS APIHANDLER------//

router.get('/profile/folders/:id',(req,res,next)=>{
    const {id} = req.params
    const accessToken = req.session.currentUser.clickUpAccessToken;
    console.log("THE ID FROM GET /PROFILE",id)
    console.log("THE accessTOKEN FROM GET /PROFILE",accessToken)
    clickUpApiHandler
    .getFolders(id,accessToken)
    .then(response =>{
        //console.log("RESPONSE OF getFOLDERS APIHANDLER",response)
        console.log("RESPONSE.DATA OF getFOLDERS APIHANDLER",response.data)
        res.render('private/folders',{folders:response.data.folders})
    })
    .catch(error=>console.log('ERROR EN GET FOLDERS APIHANDLER',error))

})




module.exports = router;