// import mongoose from "mongoose";
// export const connectDB = async()=>{
//     (await mongoose.connect('mongodb+srv://arzoo47:Arzoo123@cluster0.pq4xgxz.mongodb.net/foodapp')).then(()=>console.log("DB connected"));
// }
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://arzoo47:Arzoo123@cluster0.pq4xgxz.mongodb.net/foodapp');
        console.log("DB connected");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
