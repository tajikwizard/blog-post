// middlewares/error.js
export default function errorHandler(err, req, res, next) {
  console.error('❌ Error:', err);
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Server error',
  });
}
