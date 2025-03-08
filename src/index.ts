import dotenv from 'dotenv';
dotenv.config();
import express from "express";

import {userRouter} from './routes/user'
import { contentRouter } from './routes/content';
import { shareRouter } from './routes/share';
const app = express();
app.use(express.json())

app.use('/api/v1',userRouter)
app.use('/api/v1',contentRouter)

app.listen(3000);