import { Router } from "express";
import User from "../models/User";
import mongoose from "mongoose";
const router = Router();

router.get("/users", async (req, res) => {
    const users = await User.find();
    return res.json({
        error: false,
        data: {
            total: users.length,
            users
        }
    });
});

router.post("/users", async (req, res) => {
    if (!req.body) return res.json({ error: true, message: "Invalid request" });

    let requiredParams = ["name", "username", "email", "password"];

    for (let rp of requiredParams) {
        if (!req.body[rp])
            return res.json({ error: true, message: "Invalid request" });
    }

    const { name, username, email, password } = req.body;

    try {
        const newUser = new User({ name, username, email, password });
        await newUser.save();

        return res.json({ error: false, message: "User created!" });
    } catch (e) {
        if (e instanceof mongoose.mongo.MongoServerError) {
            if (e.code == 11000) {
                return res.json({ error: true, message: "The user exist" });
            }
        }
        
        console.log(e);

        return res.status(505).json({ error: true, message: "Internal server error" });
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ error: true, message: "User not found" });

        return res.json({
            error: false, 
            data: user 
        });
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) {
            return res.json({ error: true, message: "Invalid user ID" });
        } else {
            console.log(e);

            return res.status(505).json({ error: true, message: "Internal server error" });
        }
    }
});

router.put("/users/:id", async (req, res) => {
    try {
        if (!req.body) return res.json({ error: true, message: "Invalid request" });

        if (!req.body["name"] && !req.body["username"] && !req.body["email"] && !req.body["password"]) 
            return res.json({ error: true, message: "Invalid request" });

        const user = await User.findByIdAndUpdate(req.params.id, { ...req.body });

        if (!user) return res.status(404).json({ error: true, message: "User not found" });

        return res.json({ error: false, message: "User updated!" });
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) {
            return res.json({ error: true, message: "Invalid user ID" });
        } else {
            console.log(e);

            return res.status(505).json({ error: true, message: "Internal server error" });
        }
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return res.status(404).json({ error: true, message: "User not found" });

        return res.json({ error: false, message: "Usuario deleted!" });
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) {
            return res.json({ error: true, message: "Invalid user ID" });
        } else {
            console.log(e);

            return res.status(505).json({ error: true, message: "Internal server error" });
        }
    }
});

export default router;