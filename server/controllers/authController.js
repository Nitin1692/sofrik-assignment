import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export async function register(req, res, next) {
  try {
    const { email, password, name } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    // Hash password with Argon2
    const hashed = await argon2.hash(password);

    const user = await User.create({ email, password: hashed, name });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ 
      token, 
      user: { id: user._id, email: user.email, name: user.name } 
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Verify password with Argon2
    const ok = await argon2.verify(user.password, password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      token, 
      user: { id: user._id, email: user.email, name: user.name } 
    });
  } catch (err) {
    next(err);
  }
}
