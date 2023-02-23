export interface UserTypes {
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
}

export interface ProductTypes {
  _id?: string,
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  quantity?: number,
  numReviews: number;
  countInStock: number;
  description: string;
  isFeatured?: boolean;
  banner?: string;
}

export interface BlogTypes {
  id?: string,
  author: string,
  category: string,
  excerpt: string,
  image: string,
  title: string,
  first_content:string
  second_content: string,
  isFeatured?: boolean,
}

export interface DataTypes {
  users: UserTypes[];
  products: ProductTypes[];
  blogs: BlogTypes[]
}