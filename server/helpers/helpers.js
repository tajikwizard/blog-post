import jwt from 'jsonwebtoken';
// -------------------- Helpers --------------------
export const signToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  createdAt: u.createdAt,
});
