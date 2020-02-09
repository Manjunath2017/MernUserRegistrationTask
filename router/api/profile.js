const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const ProfileModel=require('../../models/profile');
const userModel=require('../../models/users');
const auth=require('../../middleware/auth');
const {check, validationResult}=require('express-validator');

//// @route GET --> localhost:5000/api/profile/me/
router.get('/me', auth, async (req,res)=>{ 
    console.log(res.authUserData)
    // res.send('Profile Module!')
    try{
    const profile = await ProfileModel.findOne({ user: res.authUserData.id })
    .populate('users', ['name', 'avatar']);
// console.log(profile);
    if (!profile) {
        return res.status(404).json({error:'No profile found!'});
      }
      res.json(profile);
    }catch(error){
        console.log(error.message);
        res.status(500).send('Server Error!')
    };
});
////////////////////localhost:5000/api/profile/me/ ends//////////////////////////

//// @route post /api/profile/
router.post('/',[auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills','Skills is required!').not().isEmpty()
]], async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array() });
    }
    console.log(req.body);
    const {company, website, location, bio, status, githubusersname, skills, youtube, facebook, twitter, instagram, linkedin}=req.body;

    ////Build profile object
    const profileFields={};
    // console.log()

    //// Add userId in profile
    profileFields.user=res.authUserData.id;
    console.log(res.authUserData.id);
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(location) profileFields.location=location;
    if(bio) profileFields.bio=bio;
    if(status) profileFields.status=status;
    if(githubusersname) profileFields.githubusersname=githubusersname;

    if(skills){
        profileFields.skills=skills.split(',').map(data=> data.trim());
    }
    console.log(profileFields.skills);
    //// Build social object
    profileFields.social={}
    if(youtube) profileFields.social.youtube=youtube;
    if(twitter) profileFields.social.twitter=twitter;
    if(facebook) profileFields.social.facebook=facebook;
    if(linkedin) profileFields.social.linkedin=linkedin;
    if(instagram) profileFields.social.instagram=instagram;

    try{
        console.log(res.authUserData.id);
        let profile=await ProfileModel.findOne({user:res.authUserData.id});

        if(profile){
            // console.log(profile, 'line 70');
            //// Update profile
            profile=await ProfileModel.findOneAndUpdate({user:res.authUserData.id}, {$set:profileFields}, {new: true})
        
            return res.json(profile);
        }

        //// Create
        profile=new ProfileModel(profileFields);
        await profile.save();
        res.json(profile);

    }catch(error){
        console.error(error.message); 
        res.status(500).send(error.message);
    }
    // res.send(profileFields.skills);
});
//////////////////// POST--> localhost:5000/api/profile///////////////////////////

//// @Route GET localhost:5000/api/profile/
router.get('/', async(req,res)=>{
    try{
        const profiles= await ProfileModel.find().populate('user', ['name', 'avatar']); //get only name and avatar field from user collection
        // console.log(profiles);
        res.json(profiles);
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
});
//////////////////// GET--> localhost:5000/api/profile///////////////////////////


//// @Route GET localhost:5000/api/profile/user/user:user_id/
router.get('/user/:user_id', async(req,res)=>{
    try{
        // console.log(req.params.user_id, 'line 108');
        const profile= await ProfileModel.findOne({user:req.params.user_id})
        .populate('user', ['name', 'avatar']); //get only name and avatar field from user collection
        // console.log(profiles);

        if(!profile) return res.status(400).json({msg:'Profile not found!'});
        res.json(profile);

    }catch(error){
        console.error(error.kind);
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg:'Profile not found!'})
        }
        res.status(500).send('Server Error!');
    }
});

//////////////////// GET--> localhost:5000/api/user/user:user_id///////////////////////////

module.exports=router;
