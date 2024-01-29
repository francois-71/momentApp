import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel"; // Update the import statement
import { generateAccessToken, authenticateToken } from "../utils/auth/jwtAuth";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for required fields in the request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required fields" });
    }

    // check isEmail
    if ((!email.match(/\S+@\S+\.\S+/) || email.length < 4 || email.length > 250)) {
      return res.status(400).json({ message: "User not found" });
    }

    // Validate password format
    if (!password.match(/\d/) || !password.match(/[a-zA-Z]/) || password.length < 8 || password.length > 250){
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Find the user by email in the database
    const user = await User.findOne({ where: { email } });
    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If the user exists and the password is correct, generate a JWT token
    const token = await generateAccessToken(user);
    console.log(token);

    // Send the token in the response
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/isAuthenticated", async (req, res) => {
  try {
    await authenticateToken(req, res, () => {
      res.json({ message: "Authenticated" });
    });
  } catch (error) {
    console.error("Error during authentication:", error);
  }
});

export default router;
