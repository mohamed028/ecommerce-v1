import jwt from "jsonwebtoken";
import User from '../../db/models/user.model.js'

export const auth=(customRole)=>{
    return async(req,res,next)=>{
    const {token}=req.headers
    if(!token){return next (new Error('Please LogIn',{cause:400}))}

    ///if(!revicetoken.startsWith(process.env.PERFIX)){return next (new Error("Invalid Token",{cause:400}))}

    //const token=revicetoken.split(process.env.PERFIX)[1];

    const decodeToken=jwt.decode(token,process.env.SIGNATURE)

    if(!decodeToken|| !decodeToken.id){return next (new Error('error in decode',{cause:400}))};

    const finduser=await User.findById(decodeToken.id)

    if(!finduser){(new Error("Please SignUp",{cause:400}))}
    
    if(!customRole.includes(finduser.role)){return next (new Error('You Are Not Allowed',{cause:400}))}

    req.auth=finduser

    next()

    }
}