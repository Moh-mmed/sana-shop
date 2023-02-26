import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogTypes } from "../../types/DataTypes";
import s from './BlogItem.module.css'
import {HiArrowLongRight} from 'react-icons/hi2'

type BlogItemTypes = {
  blog: BlogTypes,
}

const BlogItem: React.FC<BlogItemTypes> = ({blog}) => {

  const { slug, author, excerpt,category, image, title, createdAt } = blog

  return (
    <div className={s.root} key={slug}>
      <Link href={`/blog/${slug}`}>
        <div className={s.imgContainer}>
            <Image
            src={image}
            alt={title}
            width={1000}
            height={100}
            />
        </div>

        <div className={s.content}>
            <h3 className={s.title}>{title}</h3>
            <p className={s.excerpt}>{excerpt}</p>
          <div className={s.footer}>
            <span className={s.footer_left}>
              <span className={s.footer_category}>{category}</span>
              <span className={s.footer_bar}>|</span>
              <span className={s.footer_by}>By</span> {author}

              <span className={s.footer_bar}>|</span>
              <span>{format(new Date(createdAt), 'dd MMM yyyy')}</span>

            </span>
            <span className={s.footer_right}>
              Continue Reading
              <HiArrowLongRight className={s.footer_right_icon}/>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogItem;
