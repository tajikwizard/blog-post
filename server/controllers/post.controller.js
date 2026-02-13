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
    const post = await Post.create({ 
      title, 
      content, 
      author: req.user._id 
    });
    
    // Populate author info
    await post.populate('author', 'name email');
    
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

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 }); // Latest first
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return next({
      message: 'Server error',
      status: 500,
    });
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    
    if (!post) {
      return next({
        message: 'Post not found',
        status: 404,
      });
    }
    
    res.status(200).json({
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

export const updatePost = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return next({
        message: 'Post not found',
        status: 404,
      });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return next({
        message: 'Not authorized to update this post',
        status: 403,
      });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    await post.populate('author', 'name email');

    res.status(200).json({
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

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return next({
        message: 'Post not found',
        status: 404,
      });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return next({
        message: 'Not authorized to delete this post',
        status: 403,
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return next({
      message: 'Server error',
      status: 500,
    });
  }
};

export const getMyPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return next({
      message: 'Server error',
      status: 500,
    });
  }
};
