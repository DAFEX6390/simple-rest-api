// AL MONTAR AL HOST REMOVER LO QUE ESTE MARCADO CON "#"
import { config } from "dotenv"; // #
config(); // #

export default {
    PORT: Number(process.env["PORT"]) || 3000,
    MONGO_URI: process.env["MONGO_URI"],
    MONGO_DBNAME: process.env["MONGO_DBNAME"]
}