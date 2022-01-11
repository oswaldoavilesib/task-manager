const router = require("express").Router();
const Space = require('../../models/Space.model')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();


//----GET ALL SPACES WORKSPACE"-----//
router.get('/profile/folders/:id',(req,res,next)=>{
    const {id} = req.params
    console.log('EL ID DEL PARAMETRO',id)
    Space.findOne({id})
    .then(response =>{
        console.log(response)
        res.send("SIRVIO BROHH")
    })
    .catch(error=>console.log('EL ERROR EN PARAMS FOLDERS',error))

})

module.exports = router;