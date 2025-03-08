"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_PASSWORD = "asdasd";
const UserMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        res.status(401).json({ message: "You are not logged in" });
        return;
    }
    const token = header.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_PASSWORD);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }
};
exports.UserMiddleware = UserMiddleware;
