import jwt from "jsonwebtoken";
import env from "dotenv";


env.config();

function jwtGenerator(user_id)
{
    const payload = 
    {
        user:
        {
            id: user_id
        }
        };

        return jwt.sign(payload, process.env.jwtSecret, {expiresIn:"1h"});
}

export default jwtGenerator;