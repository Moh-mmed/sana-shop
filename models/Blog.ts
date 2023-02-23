import mongoose from "mongoose";
import slugify from 'slugify';


const BlogSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    slug: String,
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    first_content: { type: String, required: true },
    second_content: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
);


BlogSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;