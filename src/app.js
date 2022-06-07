import express, { json } from "express";
import cors from "cors";
import authRouter from './routers/1.auth/router.js';
import usersRouter from './routers/2.users/router.js';
import urlsRouter from './routers/3.urls/router.js';
import { helloWorld } from "./utils/controllers.js";

const app = express();
app.use(cors());
app.use(json());

// Routes
app.get('/', helloWorld);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/urls', urlsRouter);

export default app;