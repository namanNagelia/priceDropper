import { Router } from "express";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "Hello World from auth route" });
});

export default router;
