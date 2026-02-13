import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import errorHandler from './middlewares/error.js';
import { dbConnection } from './config/dbConfig.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use(errorHandler);

await dbConnection();
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
