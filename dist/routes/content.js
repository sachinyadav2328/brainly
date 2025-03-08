"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const utils_1 = require("../utils");
exports.contentRouter = (0, express_1.Router)();
exports.contentRouter.post("/create", userMiddleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    try {
        yield db_1.ContentModel.create({
            link,
            type,
            title,
            userId: req.userId,
            tags: []
        });
        res.status(201).json({
            success: true,
            message: "Content added"
        });
    }
    catch (e) {
        console.error("Error creating content:");
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}));
exports.contentRouter.get("/allcontent", userMiddleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const content = yield db_1.ContentModel.find({
            userId: userId,
        }).populate("userId", "username");
        res.status(200).json({
            content
        });
    }
    catch (e) {
        console.error("Error getting content:");
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}));
exports.contentRouter.delete("/deleteContent", userMiddleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.contentId;
        yield db_1.ContentModel.deleteMany({
            contentId,
            userId: req.userId
        });
        res.json({
            message: "Deleted"
        });
    }
    catch (e) {
        console.error("Error deleting content:");
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}));
exports.contentRouter.post("/api/v1/brain/share", userMiddleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
exports.contentRouter.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    // userId
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    console.log(link);
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
