const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const clickUpService = require('../../service/index')

const clickUpApiHandler = new clickUpService();

router.get('/profile/teams',(req,res)=>{
    clickUpApiHandler
    .getTeams()
    .then(response => console.log(response.data))
    .catch(error => console.log('ERROR EN GETTING TEAMS FROM API',error))
    res.render('private/teams')
})



module.exports = router;