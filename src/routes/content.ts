import { Request, Response, Router } from "express";
import { ContentModel } from "../db";
import { UserMiddleware } from "../middlewares/userMiddleware";

export const contentRouter = Router();


contentRouter.post("/api/v1/content", UserMiddleware, async (req :Request ,res: Response)=>{
    const {link ,type,title } = req.body

    await ContentModel.create({
        title,
        link,
        type,
        tags:[]

    })

})

contentRouter.get("/api/v1/content", (req,res)=>{
    
})


contentRouter.delete("/api/v1/content", (req,res)=>{
    
})



 