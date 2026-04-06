import jwt from "jsonwebtoken";

export function verifyJWT(req,res)
{
    if(jwt.verify(req.cookies.token,process.env.JWT_SECRET_KEY))
    {
        next();
    }
    else{
        return res.status(401).json({"error":"You are not authorized"});
    }
}