import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;

mongoose.connect(MONGO_URL)

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password: {type:String,password:true}
});


const ContentSchema = new mongoose.Schema({
    title:String,
    link:String,
    Tags:[{type: mongoose.Types.ObjectId, ref: 'Tags'}],
    type:String,
    userId:{type:mongoose.Types.ObjectId, ref:'user', required:true},
});


const LinkSchema = new Schema({
    hash:String,
    userId:{type: mongoose.Types.ObjectId, ref:'User', required: true, unique: true}
})



export const UserModel = model("user",UserSchema);
export const LinkModel = model("link", LinkSchema);
export const ContentModel = model("content",ContentSchema);

