const router = require("express").Router();

const clickUpService = require('../../service/')

const clickUpApiHandler = new clickUpService();

router.get('/teams',(req,res)=>{
    // clickUpApiHandler
    // .getTeams()
    // .then(response => console.log(response.data))
    // .cath(error => console.log('ERROR EN GETTING TEAMS FROM API',error))
    res.send('HI')
})



module.exports = router;