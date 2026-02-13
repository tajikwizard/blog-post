import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next({ message: 'Not authorized, no token', status: 401 });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      req.user = await User.findById(decoded.sub).select('-password');
      
      if (!req.user) {
        return next({ message: 'User not found', status: 401 });
      }

      next();
    } catch (error) {
      return next({ message: 'Not authorized, token failed', status: 401 });
    }
  } catch (error) {
    return next({ message: 'Server error', status: 500 });
  }
};
