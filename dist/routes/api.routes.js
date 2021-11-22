"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    return res.json({
        "title": "Welcome to my rest-api",
        "routes": {
            "/users": ["GET", "POST"],
            "/users/:id": ["GET", "PUT", "DELETE"]
        }
    });
});
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    return res.json({
        error: false,
        data: {
            total: users.length,
            users
        }
    });
}));
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return res.json({ error: true, message: "Invalid request" });
    let requiredParams = ["name", "username", "email", "password"];
    for (let rp of requiredParams) {
        if (!req.body[rp])
            return res.json({ error: true, message: "Invalid request" });
    }
    const { name, username, email, password } = req.body;
    try {
        const newUser = new User_1.default({ name, username, email, password });
        yield newUser.save();
        return res.json({ error: false, message: "User created!" });
    }
    catch (e) {
        if (e instanceof mongoose_1.default.mongo.MongoServerError) {
            if (e.code == 11000) {
                return res.json({ error: true, message: "The user exist" });
            }
        }
        console.log(e);
        return res.status(505).json({ error: true, message: "Internal server error" });
    }
}));
router.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).json({ error: true, message: "User not found" });
        return res.json({
            error: false,
            data: user
        });
    }
    catch (e) {
        if (e instanceof mongoose_1.default.Error.CastError) {
            return res.json({ error: true, message: "Invalid user ID" });
        }
        else {
            console.log(e);
            return res.status(505).json({ error: true, message: "Internal server error" });
        }
    }
}));
router.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body)
            return res.json({ error: true, message: "Invalid request" });
        if (!req.body["name"] && !req.body["username"] && !req.body["email"] && !req.body["password"])
            return res.json({ error: true, message: "Invalid request" });
        const user = yield User_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, req.body));
        if (!user)
            return res.status(404).json({ error: true, message: "User not found" });
        return res.json({ error: false, message: "User updated!" });
    }
    catch (e) {
        if (e instanceof mongoose_1.default.Error.CastError) {
            return res.json({ error: true, message: "Invalid user ID" });
        }
        else {
            console.log(e);
            return res.status(505).json({ error: true, message: "Internal server error" });
        }
    }
}));
router.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ error: true, message: "User not found" });
        return res.json({ error: false, message: "Usuario deleted!" });
    }
    catch (e) {
        if (e instanceof mongoose_1.default.Error.CastError) {
            return res.json({ error: true, message: "Invalid user ID" });
        }
        else {
            console.log(e);
            return res.status(505).json({ error: true, message: "Internal server error" });
        }
    }
}));
exports.default = router;
