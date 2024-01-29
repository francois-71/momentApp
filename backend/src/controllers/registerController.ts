// src/controllers/registerController.ts
import express from 'express';
import bcrypt from 'bcrypt';
import {User} from '../models/userModel';  // Update the import statement

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    // Check for required fields in the request body
    if (!req.body.email || !req.body.password || !req.body.name || !req.body.age) {
      return res.status(400).json({ message: 'Email, password, Name, and Age are required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });  // Use User instead of User
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    

    // Create a new user (password is hashed)
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      age: req.body.age,
    });

    newUser.password = await bcrypt.hash(req.body.password, 10);

    if (!newUser) {
      return res.status(400).json({ message: 'User registration failed' });
    }

    res.json({ message: 'Registration successful!', user: newUser });
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      // Handle validation errors
      const validationErrors = error.errors.map((err: any) => err.message);
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }

    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
