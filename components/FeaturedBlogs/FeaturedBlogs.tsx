import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { BlogTypes } from "../../types/BlogTypes";
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
          <div className={s.blog_root} key={blog.slug}>
            <Link href={`/blog/${blog.slug}`}>
              <div className={s.imgContainer}>
                <Image
                  className={s.img} 
                  src={blog.image}
                  alt="IMG-PRODUCT"
                  fill
                  sizes="(max-width: 640px) 100vw, 640px"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  />
              </div>

              <div className={s.description}>
                <div className={s.blog_heading}>
                  <span className={s.author}>
                    <span> By </span>

                    <span> {blog.author} </span>
                  </span>

                  <span className={s.date}>
                    <span> on </span>
                    <span> {format(new Date(blog.createdAt), 'dd MMM yyyy')} </span>
                  </span>
                </div>

                <h4 className={s.title}> {blog.title} </h4>

                <p className={s.excerpt}>{blog.excerpt}</p>
              </div>
            </Link>
          </div>
        ))}
      </div> 
    </section>
  );
};

export default FeaturedBlogs;
