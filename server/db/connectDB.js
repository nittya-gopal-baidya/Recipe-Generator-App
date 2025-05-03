import mongoose from "mongoose";

export const connectDB=async ()=>{
    try {
        
        // console.log(process.env.MONGO_URI)
        const conn=await mongoose.connect(process.env.MONGO_URI)
         console.log("DB Connected Successfuly")
    } catch (error) {
        console.log("Failed to connect with DB : ",error.message)
        process.exit(1);
    }
}