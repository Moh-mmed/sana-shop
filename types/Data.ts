export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface Product {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  isFeatured?: boolean;
  banner?: string;
}

export interface Data {
  users: User[];
  products: Product[];
}