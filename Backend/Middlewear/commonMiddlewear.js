import jwt from "jsonwebtoken";

export function verifyJWT(req, res, next) {
    try {
        if(jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY));
        {
            console.log("Reached verification")
        next();
        }
    } catch (error) {
        return res.status(401).json({"error": "Invalid or missing JWT"});
    }
}