import mongoose from "mongoose";
import slugify from 'slugify';


const BlogSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
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


BlogSchema.post('save', function (doc) {
  doc.slug = slugify(`${doc.title}-p-${doc._id}`, { lower: true });
  doc.save();
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;