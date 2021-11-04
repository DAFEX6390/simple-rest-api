"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// AL MONTAR AL HOST REMOVER LO QUE ESTE MARCADO CON "#"
const dotenv_1 = require("dotenv"); // #
(0, dotenv_1.config)(); // #
exports.default = {
    PORT: Number(process.env["PORT"]) || 3000,
    MONGO_URI: process.env["MONGO_URI"],
    MONGO_DBNAME: process.env["MONGO_DBNAME"]
};
