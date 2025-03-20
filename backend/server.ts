import * as cheerio from "cheerio";
import axios from "axios";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./src/db/schema";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("PriceDrops API is running!");
});

// API routes
app.get("/api/products", (req, res) => {
  res.json({ message: "Products endpoint" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
