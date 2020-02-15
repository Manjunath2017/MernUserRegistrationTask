const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

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
        // console.log(user, newPost);

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

//// @route GET --> localhost:5000/api/posts/
//// Get single post
router.get('/:id', auth, async(req,res)=>{
    try{
        // console.log(req.params.id, 'req.param.id');
        const post=await postModel.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'Post not found! (!post)'});
        }

        res.send(post);
    }catch(error){
        console.error(error.message);
        ////error in console Cast to ObjectId failed for value "5e4548c79b16543d506d1cb7a" at path "_id" for model "posts"
        //// to get rid of error use ---> const mongoose=require('mongoose');
        if(error.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found! '+error.kind});
        }
        res.status(500).send(error)
    } 
});
//// @route DELETE --> localhost:5000/api/posts/
//// Delete a post by id
router.delete('/:id', auth, async(req,res)=>{
    try{

        const findPost=await postModel.findById(req.params.id);
       
        // console.log(req.params.id, '......', findPost);
        
        //// if post ! exist
        if(!findPost){
            return res.status(404).send({msg:'Post not found!'})
        }
 
        // //// check user ID and loginID, if match delete 'else' can't delete other's post
        // //// FindPost.user.toString() convert to string 
        // console.log(res.authUserData.id === findPost.user.toString());
        
        if(findPost.user.toString() !== res.authUserData.id ){
            return res.status(401).json({msg:'User not authorized to delete post!'})
        }
        await findPost.remove();
        
        res.send({msg:'Post deleted'});
    }catch(error){
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'Post not found to delete(error.kind)'})
        }
        res.status(500).send('Server error, delete single post');
    }
});

//// @route PUT --> localhost:5000/api/posts/like/:id
//// Like the post  
router.put('/like/:id', auth, async(req,res)=>{
    try{
        const getPost=await postModel.findById(req.params.id);
        // console.log(getPost);

        //// check if the user already liked
        if(getPost.likes.filter(like => like.user.toString() === res.authUserData.id).length>0){
            return res.status(400).send({msg:'Post already liked!'}); ////filter 'll return a new array with all elements which are matched(true condition)
        }
        
        getPost.likes.unshift({user:res.authUserData.id});
        await getPost.save();

        res.send(getPost.likes);
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error, get allPost')
    }
});

//// @route PUT --> localhost:5000/api/posts/unlike/:id
//// unLike the post  
router.put('/unlike/:id', auth, async(req,res)=>{
    try{
        const getPost=await postModel.findById(req.params.id);
        // console.log(getPost);

        //// check if the user already liked
        if(getPost.likes.filter(like => like.user.toString() === res.authUserData.id).length === 0){
            return res.status(400).send({msg:'Post not liked!'}); ////filter 'll return a new array with all elements which are matched(true condition)
        }
        //index to remove
        const getPostIndexToRemove=getPost.likes.map( remove=> remove.user.toString()).indexOf(res.authUserData.id);
        // console.log(getPostIndexToRemove);

        getPost.likes.splice(getPostIndexToRemove, 1); ////remove the element
        await getPost.save();

        res.send(getPost.likes);
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error, get allPost');
    }
});
module.exports=router;
