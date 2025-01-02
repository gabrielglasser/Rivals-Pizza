import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.listen(3031, () => {console.log("Server is running on port 3031")});
git