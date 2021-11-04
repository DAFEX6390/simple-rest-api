"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
mongoose_1.default.connect((_a = config_1.default.MONGO_URI) !== null && _a !== void 0 ? _a : "", { dbName: config_1.default.MONGO_DBNAME })
    .then(() => {
    console.log("Conectado a MongoDB");
})
    .catch((err) => {
    console.log(err);
});
