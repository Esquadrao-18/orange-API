import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routers/router";
import errorMiddleware from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(router);
app.use(errorMiddleware);

export default app;
