import jwt from "jsonwebtoken";
import { User_data } from "../Model/users.model.js";
import bcrypt from "bcrypt";

export async function checkIfDetailsAreAMatch(req,res,next)
{
    try{
        if(req.body.userEmail && req.body.password)
        {
            const existingUser=await User_data.findOne({userEmail:req.body.userEmail});
            if(existingUser)
            {
                if(bcrypt.compareSync(req.body.password,existingUser.password))
                {
                    req.userData=existingUser;
                    next();
                }
                else{
                    return res.status(401).json({"error":"Password is incorrect"});
                }
            }
            else{
                return res.status(401).json({"error":"User with this emailID not found"});
            }
        }
        else{
            return res.status(400).json({"error":"Fill all the details"})
        }
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}