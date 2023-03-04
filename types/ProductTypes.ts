export interface ProductTypes {
  _id: string | '',
  name: string,
  slug?: string,
  category: string,
  gender: string,
  image: string,
  price: number,
  brand: string,
  rating: number,
  quantity?: number,
  numReviews: number,
  countInStock: number,
  description: string,
  isFeatured?: boolean,
  banner?: string;
}