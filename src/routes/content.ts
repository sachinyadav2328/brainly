import { Request, Response, Router } from "express";
import { ContentModel, LinkModel, UserModel } from "../db";
import { UserMiddleware } from "../middlewares/userMiddleware";
import { random } from "../utils";

export const contentRouter = Router();


contentRouter.post("/create", UserMiddleware, async (req :Request ,res: Response)=>{
    const {link ,type,title } = req.body
   try{
    await ContentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []
    })

    res.status(201).json({
        success: true,
        message:"Content added"
    })
   } catch(e){
    console.error("Error creating content:");
    res.status(500).json({ success: false, message: "Internal Server Error" });
   }
   

})

contentRouter.get("/allcontent", UserMiddleware, async (req,res)=>{
    try{
        const userId = req.userId;

        const content = await ContentModel.find({
            userId: userId,
        }).populate("userId","username")

        res.status(200).json({
            content
        })
    }catch(e){
        console.error("Error getting content:");
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  

 
    
})


contentRouter.delete("/deleteContent", UserMiddleware, async (req,res)=>{
    try{
        const contentId = req.body.contentId;

        await ContentModel.deleteMany({
            contentId,
            userId: req.userId
        })
        res.json({
            message: "Deleted"
        })
    }catch(e){
        console.error("Error deleting content:");
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
})

contentRouter.post("/api/v1/brain/share", UserMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

contentRouter.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

 