const router = require("express").Router();
const User = require('../../models/User.model')
const bcryptjs = require('bcryptjs')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const querystring = require('querystring')

//AXIOS
const axios = require('axios');


const clickUpService = require('../../service/index')


const clickUpApiHandler = new clickUpService();

let clickUpCodeApi;


//----SIGN UP PAGE ROUTES----//
/* GET signup page */
router.get("/signup", (req, res, next) => {

    res.render("auth/signup");
});

/* POST signup page */

router.post("/signup", async (req,res,next)=>{
    try{
        const {username,email,password,...rest} = req.body
        if(!username || !email){
            res.render('auth/signup',{errorMessage: "You need to provide a username and password"})
            return;
        }
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(!regex.test(password)){
            res.render("auth/signup",{errorMessage: "Password must have at least six characters, 1 uppercase, 1 lowercase, and 1 number."})
            return
        }

        const salt = await bcryptjs.genSaltSync(10)
        const hashPassword = await bcryptjs.hashSync(password,salt)
        //console.log(hashPassword)
        const user = await User.create({username,email,password:hashPassword})
        
        req.session.currentUser = user
        res.redirect('https://app.clickup.com/api?client_id=MTQ6E6ABG2IQZHO4LSAGYKHKY2HAGWCC&redirect_uri=https://task-managermx.herokuapp.com/workspace')

    }catch(error){
        console.log("ERROR EN POST DE SIGNUP",error)
    }
})

//----LOGIN PAGE ROUTES----//
/* GET LOGIN page */
router.get("/login", isLoggedIn ,(req, res, next) => {

    res.render("auth/login");
});


/* POST LOGIN page */

router.post('/login',async (req,res,next)=>{
    try{
        const {email,password,...rest} = req.body;
        if(!email || !password){
            res.render('auth/login',{errorMessage:"There is an empty field"})
            return
        }

        const user = await User.findOne({email})
        if(!user){
            res.render('auth/login',{errorMessage:"Email or password is incorrect"});
            return
        }

        if(bcryptjs.compareSync(password,user.password)){
            req.session.currentUser = user
            console.log('req.ses',req.session)
            res.redirect(`/profile`)
        } else {
            res.render('auth/login',{errorMessage: "Email or password is incorrect"})
        }
    }
    catch(error){
        console.log("Error en el POST de /login",error)
        next(error)
    }
})

//----PROFILE PAGE ROUTES----//
/* GET PROFILE page */
router.get('/profile', isLoggedOut ,(req,res,next)=>{
    //console.log(req.query.code
    res.render('private/profile',{user:req.session.currentUser})

    //console.log('clickUpCodeApi',clickUpCodeApi)
})


//----WORKSPACE PAGE ROUTES----//
/* GET WORKSPACE page */
router.get('/workspace',isLoggedOut, (req,res,next)=>{
    const clickUpCode = req.query.code
    console.log(clickUpCode)
    clickUpApiHandler
    .getAccessToken(clickUpCode)
    .then(response=>{
        console.log("RESPONSE.DATA OF getACcessTOken",response.data)
        req.session.currentUser.clickUpCode = req.query.code
        req.session.currentUser.clickUpAccessToken = response.data.access_token;
        console.log('req.ses WITH TOKENS',req.session)
        console.log(response)
        //clickUpApiHandler.saveAccessToken(response.data.access_token)
        res.render('private/workspace',{user:req.session.currentUser})
    })
    .catch(error=>console.log('ERROR EN GET TOKE ACCESS FROM CLICKUP API',error))
})



//----ABOUT US PAGE ROUTES----//
/* GET ABOUT US page */
router.get("/about-us", (req, res, next) => {
    res.render("about-us");
});

router.get('/logout',(req,res,next)=>{
    req.session.destroy(err=>{
        if(err){
            next(err)
        }
        res.redirect('/')
    })
})



//-----ROUTE FOR TESTING UI------/
router.get('/testing',(req,res,next)=>{
    res.render('private/testing')
})



module.exports = router;



