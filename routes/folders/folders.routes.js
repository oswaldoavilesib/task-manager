const router = require("express").Router();
const Space = require('../../models/Space.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const Folders = require('../../models/Folders.models')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL FOLDERS FROM A WORKSPACE"-----//

// router.get("/profile/folders", (req, res, next) => {
//     Space.findOne({id})
//     .then(response =>{
//         console.log(response)
//         console.log(response.id)
//         clickUpApiHandler
//         .getFolders(response.id,accessToken)
//         .then(response => {
//             console.log(response)
//             res.redirect('/private/folders')
//         })
//         .catch(error=>console.log("ERROR EN GET FOLDER PROMISE",error))


//     res.render("private/folders");
// });







//----TRYING TO GET THE ID OF AN SPACE FOM A DATABASE TO SENDIT TO THE GETFOLDERS APIHANDLER------//

router.get('/profile/folders/:id',(req,res,next)=>{
    const {spaceId} = req.params
    const accessToken = req.session.currentUser.clickUpAccessToken;
    console.log("THE ID FROM GET /PROFILE",spaceId)
    console.log("THE accessTOKEN FROM GET /PROFILE",accessToken)
    clickUpApiHandler
    .getFolders(spaceId,accessToken)
    .then(response =>{
        console.log("RESPONSE OF getFOLDERS APIHANDLER",response)
        res.render('private/folders')
    })
    .catch(error=>console.log('ERROR EN GET FOLDERS APIHANDLER',error))

})

// console.log('EL ID DEL PARAMETRO',id)
//     Space.findOne({id})
//     .then(response =>{
//         console.log(response)
//         console.log(response.id)
//         clickUpApiHandler
//         .getFolders(response.id,accessToken)
//         .then(response => {
//             console.log(response)
//            res.redirect('/private/folders')
//         })
//         .catch(error=>console.log("ERROR EN GET FOLDER PROMISE",error))

//     })
//     .catch(error=>console.log('EL ERROR EN PARAMS FOLDERS',error))


module.exports = router;