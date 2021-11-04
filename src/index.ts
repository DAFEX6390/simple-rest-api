import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import http from "http";

import apiRoutes from "./routes/api.routes";
import { tokenRequired } from "./util/middleware";

import "./database";

const app = express();

app.set("port", config.PORT);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", tokenRequired, apiRoutes);

http.createServer(app).listen(app.get("port"))
    .on("listening", () => {
        console.log(`API is ready on port ${app.get("port")}`);
    });