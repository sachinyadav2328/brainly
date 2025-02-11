import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
const JWT_PASSWORD = "asdasd";


declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }

export const UserMiddleware = (req: Request , res: Response, next :NextFunction) =>{
    // const header = req.headers["authorization"];
    const token = req.headers.authorization

    if (!token) {
        return res.status(403).json({
          message: "You are not logged in"
        });
      }
    
try{
    const decoded = jwt.verify(token as string,JWT_PASSWORD) as {id:string}
    if(!decoded){
        res.json({
            message:"you are not logged in"
        })
        return;
    }
     req.userId = decoded.id
       return next();
    }catch(e){
        res.json({
            message: "you are not logged in"
        })
    }

  
  
}