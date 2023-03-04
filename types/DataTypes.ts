import { BlogTypes } from "./BlogTypes";
import { ProductTypes } from "./ProductTypes";
import { UserTypes } from "./UserTypes";

export interface DataTypes {
  users: UserTypes[];
  products: ProductTypes[];
  blogs: BlogTypes[]
}
