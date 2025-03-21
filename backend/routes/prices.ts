import { Router } from "express";
import db from "../src/index";
import { usersTable } from "../src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./auth";
import * as cheerio from "cheerio";
const router = Router();
import { itemsTable } from "../src/db/schema";
router.use(cookieParser());

//1, IUsers add in links of their items
//2: Use cookies to parse the price
//3: Save the price in the database
//4: Every 1 day, check the price of the item and send a notification to the user if the price has changed via email thru a cron job
//5: If the user wants to remove the item, they can do so by clicking a button on the frontend and then the item is deleted from the database

type requestBody = {
  userId: number;
  links: string[];
  itemName: string;
};

router.post("/add-item", authenticateToken, async (req: any, res: any) => {
  const { userId, links, itemName } = req.body as requestBody;

  //1: get the HTML only the first section (main section people see)
  //2: Parse HTML to get any price bodies
  //3: Send back all the $ prices that are found with its location
  //4: in confirm method save it to DB
});
