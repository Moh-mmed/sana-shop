import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogTypes } from "../../types/DataTypes";
import s from './BlogItem.module.css'


type BlogItemTypes = {
  blog: BlogTypes,
}

const BlogItem: React.FC<BlogItemTypes> = ({blog}) => {

  const { _id, slug, author, excerpt, image, title, createdAt } = blog

  return (
    <div className={s.root} key={_id}>
      <Link href={`/blog/${slug}`}>
        <div className={s.imgContainer}>
          <Image
            className={s.img} 
            src={image}
            alt="IMG-PRODUCT"
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            style={{ objectFit: "cover" }}
            loading="lazy"
            />
        </div>

        <div className={s.description}>
          <div className={s.heading}>
            <span className={s.author}>
              <span> By </span>

              <span> {author} </span>
            </span>

            <span className={s.date}>
              <span> on </span>
              <span> {format(new Date(createdAt), 'dd MMM yyyy')} </span>
            </span>
          </div>

          <h4 className={s.title}> {title} </h4>

          <p className={s.excerpt}>{excerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogItem;
