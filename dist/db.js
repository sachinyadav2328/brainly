"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.LinkModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.connect("mongodb+srv://sachinxdev07:NIfMeaR7k5QbFWW9@cluster0.3brdh.mongodb.net/brainly");
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, password: true }
});
const ContentSchema = new mongoose_1.default.Schema({
    title: String,
    link: String,
    Tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tags' }],
    type: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'user', required: true },
});
const LinkSchema = new mongoose_2.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true, unique: true }
});
exports.UserModel = (0, mongoose_2.model)("user", UserSchema);
exports.LinkModel = (0, mongoose_2.model)("link", LinkSchema);
exports.ContentModel = (0, mongoose_2.model)("content", ContentSchema);
