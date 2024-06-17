import mongoose from "mongoose"
const orderSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    item:{type:Array, required:true},
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    statusdate:{type:Date, required:true},
    payment:{type:Boolean, required:true}
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)
export default orderModel;