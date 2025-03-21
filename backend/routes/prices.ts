import { Router } from "express";
import db from "../src/index";
import { usersTable } from "../src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./auth";
const router = Router();
router.use(cookieParser());

//1, IUsers add in links of their items
//2: Use cookies to parse the price
//3: Save the price in the database
//4: Every 1 day, check the price of the item and send a notification to the user if the price has changed via email thru a cron job
//5: If the user wants to remove the item, they can do so by clicking a button on the frontend and then the item is deleted from the database
