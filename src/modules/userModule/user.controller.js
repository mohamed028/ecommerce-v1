import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../db/models/user.model.js";
import cloudinary_connection from "../../utils/cloudinary.js";

export const Sign_up = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    recoveryEmail,
    DOB,
    mobileNumber,
    role,
  } = req.body;

  const EmailOrPhoneExist = await User.findOne({
    $or: [{ email }, { mobileNumber }],
  });

  if (EmailOrPhoneExist) {
    return next(
      new Error("Email Or phone Is Already Exist",{
        cause: 409,
      })
    );
  }
  const username=`${firstname} ${lastname}`
  const hashpass = bcrypt.hashSync(password, +process.env.SALT_ROUND);
  const addUser = await User.create({
    firstname,
    lastname,
    email,
    username,
    password: hashpass,
    recoveryEmail,
    DOB,
    mobileNumber,
    role,
  });
  if(!addUser){
  return next(new Error('signUp filed please Try Again',{cause:400}))
  }
res.status(201).json({
  Msg:"Welcome",
  addUser
})
};



export const Sign_in=async(req,res,next)=>{
  const {email,password,mobileNumber}=req.body


  const findUser=await User.findOne({$or:[{email},{mobileNumber}]})

  if(!findUser){return next (new Error('email Or Password Not Correct',{cause:400}))}


  const compirePass=bcrypt.compareSync(password,findUser.password)

  if(!compirePass){return next (new Error('email Or Password Not Correct',{cause:400}))}

  const token=jwt.sign({id:findUser._id,role:findUser.role,email:findUser.email},process.env.SIGNATURE,{expiresIn:'3m'})
  findUser.status='online'
  findUser.save()
  res.status(200).json({
    Msg:"welcome",
    token,
  })
}
