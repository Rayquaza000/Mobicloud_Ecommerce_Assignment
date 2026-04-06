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
            secure: true,       // ✅ MUST in production
            sameSite: "None"    // if frontend/backend on different domains
        });
        return res.status(200).json({"message":"Login successfull","userName":existingUser.userName,"userEmail":existingUser.userEmail,"userCart":existingUser.userCart});
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}