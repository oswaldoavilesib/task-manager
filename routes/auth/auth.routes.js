const router = require("express").Router();
const User = require('../../models/User.model')
const bcryptjs = require('bcryptjs')
const {isLoggedIn, isLoggedOut} = require('../../utils/route-guard')
const querystring = require('querystring')
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
        console.log(req.body)
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
        console.log(hashPassword)
        const user = await User.create({username,email,password:hashPassword})
        req.session.currentUser = user
        res.redirect('https://app.clickup.com/api?client_id=MTQ6E6ABG2IQZHO4LSAGYKHKY2HAGWCC&redirect_uri=https://task-managermx.herokuapp.com/profile')
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
            res.redirect('/profile')
        } else {
            res.redirect('https://app.clickup.com/api?client_id=MTQ6E6ABG2IQZHO4LSAGYKHKY2HAGWCC&redirect_uri=https://task-managermx.herokuapp.com/profile')
            //res.render('auth/login',{errorMessage: "Email or password is incorrect"})
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
    //console.log(req.query.code)
    req.session.currentUser.clickUpCode = req.query.code
    //console.log(req.session.currentUser)
    
    clickUpApiHandler.
    getAccessToken(req.session.currentUser.clickUpCode)
    .then(response =>{
        console.log(response)
        res.render('private/profile',{user:req.session.currentUser})
    })
    .catch(error => console.log('ERROR EN GET ACCESS TOKEN',error))
    //console.log('clickUpCodeApi',clickUpCodeApi)
})

  /* POST PROFILE page */
// router.post('/profile', isLoggedOut ,(req,res,next)=>{
// })

//----WORKSPACE PAGE ROUTES----//
/* GET WORKSPACE page */
router.get('/workspace',(req,res,next)=>{
    res.render('private/workspace')
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





module.exports = router;




//https://app.clickup.com/api?client_id=MTQ6E6ABG2IQZHO4LSAGYKHKY2HAGWCC&redirect_uri=https://task-managermx.herokuapp.com/profile