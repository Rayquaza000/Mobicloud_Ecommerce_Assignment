import jwt from "jsonwebtoken";
import { User_data } from "../Model/users.model";

export function adminLogin(req,res)
{
    try{
        const token=jwt.sign({"adminEmail":req.adminData.adminEmail},process.env.JWT_SECRET_KEY);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,       
            sameSite: "None"    
        });
        res.cookie("administrator","permission granted");
        return res.status(200).json({"message":"Login successful","adminName":adminName,"adminEmail":adminEmail});
    }   
    catch(error)
    {
        return res.status(500).json({"error":error});
    } 
}

export async function sendAllUsers(req,res)
{
    try{
        const allUsers=await User_data.find();
        if(allUsers)
        {
            return res.status(200).json({"message":"Users successfully fetched"});
        }
        else{
            return res.status(404).json({"error":"Data of all users cannot be found"})
        }
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}


export function adminLogout(req,res)
{
    try{
    res.clearCookie("token");
    res.clearCookie("administrator");
    return res.status(200).json({"message":"Admin logged out"})
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}