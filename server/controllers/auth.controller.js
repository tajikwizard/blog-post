import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { signToken, publicUser } from '../helpers/helpers.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next({ message: 'All fields required', status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password',
    );

    if (!user) {
      return next({ message: 'Invalid credentials', status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return next({ message: 'Invalid credentials', status: 401 });
    }
    const token = signToken(user._id);

    res.status(200).json({
      message: 'Login success',
      token,
      user: publicUser(user),
    });
  } catch (error) {
    console.error(error);
    return next({
      message: 'Server error',
      status: 500,
    });
  }
};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return next({
        message: 'All fields are required',
        status: 400,
      });
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return next({
        message: 'User with this email already exists',
        status: 409,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({
      message: 'Registered successfully',
      user: publicUser(user),
    });
  } catch (error) {
    console.error(error);
    return next({
      message: 'Server error',
      status: 500,
    });
  }
};
