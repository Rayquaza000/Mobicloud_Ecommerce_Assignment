import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    itemIdArray:{
        type:Array
    },
    itemsArray:{
        type: Array,
    },
    priceOfOneUnitArray:{
        type:Array,
    },
    quantityArray:{
        type:Array,
    }
});

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    userPassword:{
        type:String,
        required:true
    },
    userCart:{
        type:cartSchema,
        required:true
    }
});

export const User_data=mongoose.model("User_data",userSchema)