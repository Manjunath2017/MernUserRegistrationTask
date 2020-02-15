const express=require('express');
const router=express.Router();

const postModel=require('../../models/post');
const profileModel=require('../../models/profile');
const userModel=require('../../models/users');

const {check, validationResult}=require('express-validator');
const auth =require('../../middleware/auth');


//// @route POST --> localhost:5000/api/posts/
//// Add a post on timeline 
router.post('/',  [auth, [
    check('text', 'text is required!').not().isEmpty()
]
], async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({error:errors.array() });
    }
    console.log(res.authUserData.id, 'auth id');
    try{
        const user=await userModel.findById(res.authUserData.id).select('-password');
        const newPost=new postModel({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:user.id
        });
        console.log(user, newPost);

        const post=await newPost.save();
        res.json(post);
        
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error, addPost');
    }
});

//// @route GET --> localhost:5000/api/posts/
//// Get all posts 
router.get('/', auth, async(req,res)=>{
    try{
        const allPosts=await postModel.find({}).sort({date:-1})
        res.send(allPosts);
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error, get allPost')
    }

});


module.exports=router;