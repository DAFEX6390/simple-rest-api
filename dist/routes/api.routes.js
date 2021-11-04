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
        return res.json({ error: true, message: "Petición invalida" });
    let requiredParams = ["name", "username", "email", "password"];
    for (let rp of requiredParams) {
        if (!req.body[rp])
            return res.json({ error: true, message: "Petición invalida" });
    }
    const { name, username, email, password } = req.body;
    try {
        const newUser = new User_1.default({ name, username, email, password });
        yield newUser.save();
        return res.json({ error: false, message: "Usuario creado" });
    }
    catch (e) {
        if (e instanceof mongoose_1.default.mongo.MongoServerError) {
            if (e.code == 11000) {
                // duplicate key error collection
                // no se que mensaje de error mandar :'v
                return res.json({ error: true, message: "Usuario con valores duplicados" });
            }
        }
        console.log(e);
        return res.status(505).json({ error: true, message: "Error interno en el servidor" });
    }
}));
router.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).json({ error: true, message: "Usuario no encontrado" });
        return res.json({
            error: false,
            data: user
        });
    }
    catch (e) {
        if (e instanceof mongoose_1.default.Error.CastError) {
            return res.json({ error: true, message: "ID no valida" });
        }
        else {
            console.log(e);
            return res.status(505).json({ error: true, message: "Error interno en el servidor" });
        }
    }
}));
router.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body)
            return res.json({ error: true, message: "Petición invalida" });
        if (!req.body["name"] && !req.body["username"] && !req.body["email"] && !req.body["password"])
            return res.json({ error: true, message: "Petición invalida" });
        const user = yield User_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, req.body));
        if (!user)
            return res.status(404).json({ error: true, message: "Usuario no encontrado" });
        return res.json({ error: false, message: "Usuario actualizado" });
    }
    catch (e) {
        if (e instanceof mongoose_1.default.Error.CastError) {
            return res.json({ error: true, message: "ID no valida" });
        }
        else {
            console.log(e);
            return res.status(505).json({ error: true, message: "Error interno en el servidor" });
        }
    }
}));
router.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ error: true, message: "Usuario no encontrado" });
        return res.json({ error: false, message: "Usuario eliminado" });
    }
    catch (e) {
        if (e instanceof mongoose_1.default.Error.CastError) {
            return res.json({ error: true, message: "ID no valida" });
        }
        else {
            console.log(e);
            return res.status(505).json({ error: true, message: "Error interno en el servidor" });
        }
    }
}));
exports.default = router;
