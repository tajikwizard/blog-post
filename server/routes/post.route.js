import express from 'express';
import { 
  createPost, 
  getPosts, 
  getPost, 
  updatePost, 
  deletePost,
  getMyPosts 
} from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes - specific routes first to avoid conflicts
router.get('/', getPosts);
router.get('/my-posts', protect, getMyPosts); // Protected but defined early
router.get('/:id', getPost);

// Protected routes
router.use(protect); // All routes below require authentication
router.post('/create', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
