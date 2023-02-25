import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BlogTypes } from '../../types/DataTypes'
import s from './RelatedBlogs.module.css'

type RelatedBlogsType = {
  data: BlogTypes[]
}

const RelatedBlogs: React.FC<RelatedBlogsType> = ({data}) => {
  return (
    <section>
      <h3 className={s.heading}>Related Blogs</h3>
      <ul>
        {data.length > 0 && data.map((item: BlogTypes) => {
          return (
            <li className={s.listItem} key={item.slug}>
              <Link href={`/blog/${item.slug}`}  >
                <div className={s.imgContainer}>
                  <Image
                    className={s.img} 
                    src={item.image}
                    alt={item.title}
                    // fill
                    width={400}
                    height={100}
                    />
                </div>

                <div className={s.itemTitle}>{item.title}</div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default RelatedBlogs