import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User_data"
    },
    orderStatus:{
        type:String,
        required:true
    },
    orderItems:{
        type:Array<String>(null),
        required:true
    },
    orderItemPrice:{
        type:Array<Number>(null),
        required:true
    },
    orderItemQuantity:{
        type:Array<Number>(null),
        required:true
    },
    orderTotalPrice:{
        type:Number,
        required:true
    }
});

export const Order_data=mongoose.model("Order_data",orderSchema);
