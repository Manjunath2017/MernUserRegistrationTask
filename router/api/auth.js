const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const UserModel=require('../../models/users');
const {check, validationResult}=require('express-validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('config');


////.................get data using token........................
//// localhost:5000/api/auth/
router.get('/', auth, async(req,res)=>{ 
    try{
        // console.log(res.authUserData, 'auth.js line 7'); 
        const user=await UserModel.findById(res.authUserData.id).select('-password');
        res.json(user);
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server Error!')
    }
});

////.................Authenticate user & get token..................
//// User login
//// localhost:5000/api/auth/
router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required!').exists()
], async(req,res)=>{ 
    // console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { email, password}=req.body;

    try{
        //// see if user exists
        let user=await UserModel.findOne({email});
        if(!user){
           return res.status(400).json({errors:[{msg:'Invalid credentials!'}]})
        }

        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid credentials!'}]})
        }
   
        ////Return jsonWebToken
        const payLoad={
            userData:{
                id:user.id,
                name:user.name
            }
        }
        ////Generate token
        jwt.sign(payLoad, config.get('jwtSecret'), {expiresIn:360000}, (error, token)=>{
            if(error) throw error
            // console.log(token, 'line 54');
            res.json({token})
        });
    }   catch(error){
        console.error(error.message);
        res.status(500).send('Server error!');
    } 
});

module.exports=router;