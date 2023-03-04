export interface BlogTypes {
  _id?: string,
  author: string,
  category: string,
  excerpt: string,
  image: string,
  title: string,
  slug?: string;
  first_content:string
  second_content: string,
  isFeatured?: boolean,
  createdAt?:any
}