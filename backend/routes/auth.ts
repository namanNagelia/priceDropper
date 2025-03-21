import { Router } from "express";
import db from "../src/index";
import { usersTable } from "../src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router = Router();
router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

router.get("/test", (req, res) => {
  res.json({ message: "Hello World from auth route" });
});

router.post("/register", async (req: any, res: any) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (existingUser.length) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (existingUser.length) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await db.insert(usersTable).values({
    email,
    password: hashedPassword,
    name,
  });

  res.status(201).json({ message: "User registered successfully" });
});

// 🔹 Login Route with JWT and Cookies
router.post("/login", async (req: any, res: any) => {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, req.body.email));

    if (!user.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JS from accessing cookie
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Logout Route (Clears Cookie)
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// 🔹 Protected Route Example
router.get("/protected", authenticateToken, async (req: any, res: any) => {
  const userDetails = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, req.user.email));
  res.json({
    message: "You have access to this protected route!",
    user: userDetails[0],
    userDetails: userDetails,
    token: req.cookies.token,
  });
});

export default router;
