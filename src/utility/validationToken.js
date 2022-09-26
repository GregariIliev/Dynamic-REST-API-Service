import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

export function validateToken(req) {
    const secret = process.env.SECRET;
    const token = req.headers.authorization.split('Bearer ')[1];
    
    return jwt.verify(token, secret);
}


// const token = jwt.sign({token: 'authorization'}, process.env.SECRET, {expiresIn: '1h'});