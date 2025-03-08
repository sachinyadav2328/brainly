import { Request, Response, Router } from "express"
import { UserModel } from "../db";
import jwt from "jsonwebtoken";
export const userRouter = Router();
const JWT_PASSWORD = "asdasd"

userRouter.post("/signup", async (req :Request, res:Response)=>{
  const username = req.body.username;
  const password = req.body.password;
    // TODO: zod validation , hash the password
    try {
      await UserModel.create({
          username: username,
          password: password
      }) 

      res.json({
          message: "User signed up"
      })
  } catch(e) {
      res.status(411).json({
          message: "User already exists"
      })
  }

})

userRouter.post("/signin", async (req,res)=>{
     const email = req.body.email;
     const password = req.body.password;


     const existingUser = await UserModel.findOne({
                email:email,
                password: password
     })
     
     if(existingUser){
      const token = jwt.sign({
        id: existingUser._id
      },JWT_PASSWORD)

      res.json({
        token
       })
     } else {
      res.json({
        message: "Incorrect credential"
      })
     }

     
})



