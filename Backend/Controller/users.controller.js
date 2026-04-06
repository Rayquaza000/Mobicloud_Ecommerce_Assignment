import brcypt from "bcrypt";
import { User_data } from "../Model/users.model.js";
import jwt from "jsonwebtoken";

export async function signup(req,res)
{
    try{
        const encryptedPassword=brcypt.hashSync(req.body.password,10);
        let newUser={
            userName:req.body.userName,
            userEmail:req.body.userEmail,
            userPassword:encryptedPassword,
            userCart:{
                itemsArray:[],
                priceOfOneUnitArray:[],
                quantityArray:[]
            }
        }
        await User_data.insertOne(newUser);
        return res.json(201).json({"message":"New User Created"});
    }
    catch(error)
    {
        res.status(500).json({"error":error});
    }
}

export async function login(req,res)
{
    try{
        const token=jwt.sign({"userEmail":req.body.email},process.env.JWT_SECRET_KEY);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,       
            sameSite: "None"    
        });
        return res.status(200).json({"message":"Login successfull","userID":existingUser._id,"userName":existingUser.userName,"userEmail":existingUser.userEmail,"userCart":existingUser.userCart});
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function displayCart(req,res)
{
    try{
        const userData=await User_data.findOne({"_id":req.body.userId});
        const userCart=userData.userCart;
        return res.status(200).json({"message":"cart data received","userCart":userCart})
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function updateCart(req,res)
{
    try{
        const userData=await User_data.findOne({_id:req.body.id});
        if(userData)
        {
            userData.userCart=req.body.cart;
            await userData.save();
            return res.status(200).json({"message":"Cart updated successfully"});
        }
        else{
            return res.status(500).json({"error":"user with id "+req.body.id+" could not be found"});
        }
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export function logout(req,res)
{
    try{
        res.clearCookie("token")
        return res.status(200).json({"message":"User loggedout"})
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}