import mongoose from "mongoose";

const connectMongoDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    }catch(err){
        console.log("DB connection failed: ",err);
    }
}

export default connectMongoDb;