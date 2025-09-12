import dotenv from "dotenv";

dotenv.config();

export default {
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "asd123",
    DB_NAME: process.env.DB_NAME || "test_db",
    PORT: process.env.PORT || 3000,
}