import mongoose from "mongoose"

const connectDb = async() =>{
    try {
        // console.log(process.env.MONGODB_URL);
        await  mongoose.connect(process.env.MONGODB_URL)
        console.log("Db Connected");
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDb;