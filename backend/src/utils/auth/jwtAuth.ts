import { User } from "../../models/userModel";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const dotenv = require("dotenv");

dotenv.config();

interface AuthenticatedRequest extends Request {
  userId?: number;
}

async function generateAccessToken(user: InstanceType<typeof User>) {
  const secretKey = process.env.TOKEN_SECRET;

  if (!secretKey) {
    throw new Error(
      "TOKEN_SECRET is not defined in the environment variables. Please set a secure secret key."
    );
  }

  const userObject = {
    id: user.id,
    email: user.email,
    name: user.name,
    age: user.age,
  };

  console.log(userObject.email);

  return jwt.sign(userObject, secretKey, { expiresIn: "30m" });
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).send("No authorization header provided");
    }

    const tokenParts = authHeader.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "bearer") {
      return res.status(401).send("Invalid token format");
    }

    const token = tokenParts[1];
    const secretKey = process.env.TOKEN_SECRET;

    if (token === "undefined") {
      return res.status(401).send("Invalid token");
    }

    if (!secretKey) {
      throw new Error(
        "TOKEN_SECRET is not defined in the environment variables. Please set a secure secret key."
      );
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(403).send("Invalid token");
      }

      // Attach the decoded payload to the request object for use in subsequent middleware or routes
      req.userId = decoded.id;

      next();
    });
  } catch (error) {
    console.error("Error during token authentication:", error);
    res.status(500).send("Internal Server Error");
  }
}

export { generateAccessToken, authenticateToken };
