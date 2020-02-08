const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=(req, res, next)=>{
    ////Get token from header
    const token=req.header('auth-token-anyName');
    
    ////Check if not token
    if(!token)
        return res.status(401).json({message:'No token, authorization denied!'});

    ////verify token
    try{
        // const conf=config.get('jwtSecret');
        // console.log(token, 'token', 'middleware line 11', conf);
        const decoded=jwt.verify(token, config.get('jwtSecret'));
        // console.log(decoded, 'decoded', 'middleware line 13');

        res.authUserData=decoded.userData; ////use this value is next function
        //res.user=decoded.userData
        next();

    }catch(error){
        res.status(401).json({message:'!Token is not valid!'});
    }

}
