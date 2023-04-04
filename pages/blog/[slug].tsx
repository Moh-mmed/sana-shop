import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import { BlogTypes } from "../../types/BlogTypes";
import RelatedBlogs from "../../components/RelatedBlogs/RelatedBlogs";
import axios from "axios";
import Image from "next/image";
import s from '../../styles/blog/BlogDetail.module.css'
import Link from "next/link";
import { format } from "date-fns";

type DetailPage = {
  blogDetail: BlogTypes,
  relatedBlogs: BlogTypes[]
}

const BlogDetail: NextPage<DetailPage> = ({blogDetail, relatedBlogs}) => {

  const {
    _id,
    author,
    createdAt,
    category,
    excerpt,
    image,
    title,
    first_content,
    second_content
} = blogDetail

    
if (!blogDetail) {
    return <Layout title="Blog Not Found"><div className={s.notFound}>
        Blog Not Found
    </div></Layout>;
}
  
return (
    <Layout title={title} description={excerpt}>
      <section className={s.root}>
        <div className={s.goBack}>
            <Link href="/blog" className={s.goBack_link}>
                &lt; Back to Blog
            </Link>
        </div>
        <div className={s.main}>
            <div className={s.content}>
                <div className={s.imgContainer}>
                    <Image
                    src={image}
                    alt={title}
                    width={1000}
                    height={100}
                    />
                </div>

                <div className={s.details}>
                    <span className={s.heading}>
                        <span className={s.heading_category}>
                            {category}
                        </span>

                        <span>
                            <span className={s.heading_by}>By</span> {author}
                            <span className={s.heading_bar}>|</span>
                        </span>

                        <span>{format(new Date(createdAt), 'dd MMM yyyy')}</span>
                    </span>

                    <h4 className={s.title}>{title}</h4>

                    <p className={s.first_content}>{first_content}</p>

                    <p className={s.second_content}>{second_content}</p>
                </div>
            </div>

            <div className={s.sideMenu}>
                {relatedBlogs.length>0 && <RelatedBlogs data={relatedBlogs} />}
            </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async(context:any) =>{
  const { slug } = context.params;
  const blog = await axios.get(`${process.env.ROOT_URL}/api/blogs/${slug}`);
  const blogDetail = blog.data.data

   if (!blogDetail) {
    return {
      props: {
        blogDetail:null
      },
    };
  }

  const {author} = blogDetail
  let {data} = await axios.get(`${process.env.ROOT_URL}/api/blogs?author=${author}&limit=4`);
  const relatedBlogs = data.data.filter((item:BlogTypes)=>item.slug!==slug)

  return {
    props: {
      blogDetail: blog.data.data,
      relatedBlogs
    },
  };
}


export default BlogDetail
