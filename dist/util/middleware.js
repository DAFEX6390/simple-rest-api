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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRequired = void 0;
const tokenRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /*if (!req.headers["authorization"]) return res.status(403).json({ error: true, message: "No autorizado" });

    const admin = await Admin.findOne({ token: req.headers["authorization"] });

    if (!admin) return res.status(403).json({ error: true, message: "No autorizado" });

    else next(); */
    next();
});
exports.tokenRequired = tokenRequired;