const express=require('express');
const router=express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcrypt');
const {check, validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');

const UserModel = require('../../models/users');

router.post('/',[
    check('name', 'Name is required!').not().isEmpty(), //// They must not() be equal
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a Password with 6 or more characters').isLength({min:6})
], async(req,res)=>{ 
    // console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name, email, password}=req.body

    try{
        //// see if user exists
        let user=await UserModel.findOne({email});
        if(user){
           return res.status(400).json({errors:[{msg:'User already exists!'}]})
        }

        //// Get users gravatar
        const avatar=gravatar.url(email,{
            s:'200', //// size
            r:'pg', //// rating
            d:'mm' //// default image
            //// http://en.gravatar.com/site/implement/images/
        });

        user=new UserModel({
            name,email,avatar,password
        });

        // console.log(user.password, 'user.password 39 line!');

        //// Encrypt password
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        console.log(user.password);
        await user.save();

        //// Return jsonWebToken
        const payLoad={
            userData:{
                id:user.id,
                name:user.name
            }
        }
        jwt.sign(payLoad, config.get('jwtSecret'), {expiresIn:360000}, (error, token)=>{
            if(error) throw error
            console.log(token, 'line 61');
            res.json({token})
        });

    }   catch(error){
        console.error(error.message);
        res.status(500).send('Server error!');
    } 
});

module.exports=router;