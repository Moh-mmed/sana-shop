import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    // slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    first_content: { type: String, required: true },
    second_content: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Blog =
  mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;