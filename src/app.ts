import express, { Application } from "express";
import userRoutes from "../routes/userRoutes";
import sequelize from "../config/database";
import dotenv from "../config/dotenv";

// Create Express App
const app: Application = express();

// Middleware                  //have to use before route
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Sync database
sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

export default app;
