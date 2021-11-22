"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
require("./database");
const app = (0, express_1.default)();
app.set("port", config_1.default.PORT);
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", api_routes_1.default);
http_1.default.createServer(app).listen(app.get("port"))
    .on("listening", () => {
    console.log(`API is ready on port ${app.get("port")}`);
});
