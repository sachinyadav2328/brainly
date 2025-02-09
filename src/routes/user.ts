import { Request, Response, Router } from "express"
import { UserModel } from "../db";
export const userRouter = Router();

userRouter.post("/signup", async (req :Request, res:Response)=>{
  const username = req.body.username;
  const password = req.body.password;
    // TODO: zod validation , hash the password
      await UserModel.create({
         username:username,
         password:password
      })
      res.json({
        message:"user signed up"
      })

})

userRouter.post("/signin", (req,res)=>{
    
})



