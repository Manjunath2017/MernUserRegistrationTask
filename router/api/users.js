const express=require('express');
const router=express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcrypt');
const {check, validationResult}=require('express-validator');

const UserModel = require('../../models/users');

router.post('/',[
    check('name', 'Name is required!').not().isEmpty(), //they must not() be equal
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
        // see if user exists
        let user=await UserModel.findOne({email});
        if(user){
           return res.status(400).json({errors:[{msg:'User already exists!'}]})
        }

        //Get users gravatar
        const avatar=gravatar.url(email,{
            s:'200', //size
            r:'pg', //rating
            d:'mm' //default image
            //http://en.gravatar.com/site/implement/images/
        });

        user=new UserModel({
            name,email,avatar,password
        });

        console.log(user.password, 'user.password 39 line!');

        //Encrypt password
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        console.log(user.password);
        await user.save();

        //Return jsonWebToken
        console.log(user);
        res.send('User Register!');

    }   catch(error){
        console.error(error.message);
        res.status(500).send('Server error!');
    } 

    // res.send('User Module!');

});

module.exports=router;