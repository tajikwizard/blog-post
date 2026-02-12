import Post from '../models/postModel.js';

export const createPost = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return next({
        message: 'All fields are required',
        status: 400,
      });
    }
    const post = await Post.create({ title, content });
    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    return next({
      message: 'Server error',
      status: 500,
    });
  }
};
// export const readPosts = async () => {};
// export const readPost = async () => {};
// export const updatetePost = async () => {};
// export const deletePost = async () => {};
