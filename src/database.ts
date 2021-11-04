import mongoose from "mongoose";
import config from "./config";

mongoose.connect(config.MONGO_URI ?? "", { dbName: config.MONGO_DBNAME })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });