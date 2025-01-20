import jwt from "jsonwebtoken"
export const generateTokenAndSetCookie=(res,userId)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"3d",
    })
    res.cookie("token",token,{
        httpOnly:true,//prevent xss attack
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",//prevent cross site request attack
        maxAge:3*24*60*60*1000,//valid for 3 days
    })
return token;
}