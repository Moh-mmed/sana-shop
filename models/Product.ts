import mongoose from "mongoose";
import slugify from 'slugify';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    slug: String,
    category: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true},
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    banner: String,
  },
  {
    timestamps: true
  }
);

ProductSchema.post('save', function (doc) {
  doc.slug = slugify(`${doc.name}-${doc.brand}-p-${doc._id}`, { lower: true });
  doc.save();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
