"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
const content_1 = require("./routes/content");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', user_1.userRouter);
app.use('/api/v1', content_1.contentRouter);
app.listen(3000);
