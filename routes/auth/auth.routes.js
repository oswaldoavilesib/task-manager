const router = require("express").Router();
const User = require('../../models/User.model')

const bcryptjs = require('bcryptjs')

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
        res.redirect('/profile')

    }catch(error){
        console.log("ERROR EN POST DE SIGNUP",error)
    }
})

//----LOGIN PAGE ROUTES----//
/* GET LOGIN page */
router.get("/login", (req, res, next) => {

    res.render("auth/login");
});

//----PROFILE PAGE ROUTES----//
/* GET ABOUT US page */
router.get('/profile',(req,res,next)=>{
    res.render('profile')
})


//----ABOUT US PAGE ROUTES----//
/* GET ABOUT US page */
router.get("/about-us", (req, res, next) => {
    res.render("about-us");
});


module.exports = router;
