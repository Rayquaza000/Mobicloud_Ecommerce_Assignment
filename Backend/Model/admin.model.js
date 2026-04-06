import mongoose from "mongoose";

const adminSchema=mongoose.Schema({
    adminName:{
        type:String,
        required:true,
    },
    adminEmail:{
        type:String,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    }
})

export const Admin_data=mongoose.model("Admin_data",adminSchema);