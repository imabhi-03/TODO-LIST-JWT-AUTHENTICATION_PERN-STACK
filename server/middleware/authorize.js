import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const authorize= async(req, res, next)=> 
{
    try {
            const Token=req.header("jwtToken");

            if(!Token)
            {
                return res.status(403).json("Authorization Denied");
            }

            const payload= jwt.verify(Token,process.env.jwtSecret); 
            req.user=payload.user;
            next();

    } catch (err) {
                        console.error(err.message);
                        return res.status(403).json("Token is not valid");
    }
}

export default authorize;