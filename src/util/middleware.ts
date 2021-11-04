import { NextFunction, Request, Response } from "express";
import Admin from "../models/Admin";

export const tokenRequired = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["authorization"]) return res.status(403).json({ error: true, message: "Unauthorized" });

    const admin = await Admin.findOne({ token: req.headers["authorization"] });

    if (!admin) return res.status(403).json({ error: true, message: "Unauthorized" });

    else next();
}