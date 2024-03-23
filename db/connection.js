import mongoose from "mongoose";



const connection_db=async()=>{
    await mongoose.connect(process.env.LOCAL_HOST)
    .then(()=>{console.log("Database Connection Sucssed")})
    .catch((err)=>{console.log("Database Connection filed",err)})
}


export default connection_db