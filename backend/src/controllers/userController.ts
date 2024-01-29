import express from "express";
import bcrypauthenticateTokent from "bcrypt";
import {User} from "../models/userModel";  // Update the import statement

import { authenticateToken } from "../utils/auth/jwtAuth";

const router = express.Router();

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const authenticatedUserId: number | undefined = req.userId;

    if (authenticatedUserId === undefined) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const user = await User.findByPk(authenticatedUserId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error during fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
