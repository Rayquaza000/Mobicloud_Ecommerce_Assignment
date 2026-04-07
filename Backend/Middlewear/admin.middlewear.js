import { Admin_data } from "../Model/admin.model.js";
import bcrypt from "bcrypt";
export async function checkIfAdminDetailsAreAMatch(req,res,next)
{
    try{
        const adminData=await Admin_data.findOne({adminEmail:req.body.adminEmail});
        if(adminData)
        {
            if(bcrypt.compareSync(req.body.adminPassword,adminData.adminPassword))
            {
                req.adminData=adminData;
                next();
            }
            else{
                return res.status(401).json({"error":"Password is incorrect"})
            }
            
        }
        else{
            return res.status(401).json({"error":"Incorrect Email"});
        }
    }
    catch(error)
    {
        return res.status(500).json({"error":error})
    }
}

export function hasAuthority(req,res,next)
{
    try{
        if(req.cookies.administrator=="permission granted")
        {
            next();
        }
        else{
            return res.status(401).json({"error":"you dont have admin priviledges"})
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({"error":error});
    }
}