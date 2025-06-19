

 import User from '../models/User.js';
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import { sendWelcomeEmail } from '../utils/email.js';  // Import here

  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
  export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

   try {
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(409).json({ message: 'Email already in use.' });
    }
      const newUser = new User({ name, email, password });
      await newUser.save();

      // Send welcome email asynchronously (don't block the response)
      sendWelcomeEmail(email, name);

      res.status(201).json({ message: 'User registered successfully.' });
   } catch (error) {
     console.error('Registration error:', error);
     res.status(500).json({ message: 'Server error during registration.' });
   }
  };

  export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

   try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login.' });
    }
  };





