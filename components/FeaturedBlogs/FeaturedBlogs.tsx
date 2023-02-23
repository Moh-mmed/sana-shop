import React from "react";
import { BlogTypes } from "../../types/DataTypes";
import BlogItem from "../BlogItem/BlogItem";
import s from './FeaturedBlogs.module.css'

type PropsTypes = {
    data: BlogTypes[],
}
      
const FeaturedBlogs: React.FC<PropsTypes> = ({ data }) => {
  return (
    <section className={s.root}>
      <h3 className={s.heading}>Our Blogs</h3>
      <div className={s.blogsContainer}>
        {data.map((blog) => (
          <BlogItem blog={blog} key={blog.slug}/>
        ))}
      </div> 
    </section>
  );
};

export default FeaturedBlogs;
