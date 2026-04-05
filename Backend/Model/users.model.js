import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    itemsArray:{
        type: Array<String>(null),
    },
    priceOfOneUnitArray:{
        type:Array<Number>(null),
    },
    quantityArray:{
        type:Array<Number>(null),
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