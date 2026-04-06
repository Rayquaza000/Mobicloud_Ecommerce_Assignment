import jwt from "jsonwebtoken";
import { User_data } from "../Model/users.model.js";

export function validateDetails(req,res,next)
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if(req.body.newUserName && req.body.newUserEmail && req.body.password)
        {
            if(emailRegex.test(req.body.newUserEmail))
            {
                if(req.body.password.length>=8 && req.body.password.match(/\d/) && /[^a-zA-Z0-9]/.test(req.body.password))
                {
                    next();
                }
                else{
                    return res.status(422).json({"error":"Password must have atleast 8 characters, a number and a symbol"});
                }
            }
            else{
                return res.status(422).json({"error":"Email format is incorrect"});
            }
        }
        else{
            return res.status(400).json({"error":"Fill all the details"})
        }
}

export async function checkIfUserExists(req,res,next)
{
    try{
    const user=await User_data.findOne({userEmail:req.body.userEmail});
    if(user)
    {
        return res.status(409).json({"error":"User already exists"});
    }
    else{
        next();
    }
}
catch(error)
{
    return res.status(500).json({"error":error})
}
}