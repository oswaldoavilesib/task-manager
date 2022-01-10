const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const axios = require('axios');
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();

router.get('/profile/teams',async (req,res)=>{

    try {
        console.log(req.session.currentUser.clickUpAccessToken)
        const accessToken = req.session.currentUser.clickUpAccessToken
        const response = await axios.get('https://api.clickup.com/api/v2/team',{
            headers:{
                'Authorization': accessToken,
            }
        })
        console.log(response.data)
        res.render('private/teams')
    } catch(error){
        console.log('ERROR EN TEAMS ENDPOINT API',error)
    }
})



module.exports = router;