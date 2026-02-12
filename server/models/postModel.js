import mongoose from 'mongoose';
// -------------------- Model --------------------
const postSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, maxlength: 80 },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);
const Post = mongoose.model('Post', postSchema);
export default Post;
