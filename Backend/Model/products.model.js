import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productQuantity:{
        type:Number,
        required:true,
        default:0
    },
    productPrice:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePykPxV7hbiMoufhNrCVlkEh94nvJQIMDeA&s"
    },
    productCategory:{
        type:String,
        default:"others"
    }

});

export const Product_data=mongoose.model("Product_data",productSchema)