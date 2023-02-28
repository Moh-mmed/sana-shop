import React from "react";
import { ProductTypes } from "../../types/DataTypes";
import s from './FeaturedProducts.module.css'
import Link from "next/link";
import Image from "next/image";

type PropsTypes = {
    data: ProductTypes[],
}
      
const FeaturedProducts: React.FC<PropsTypes> = ({ data }) => {
  return (
    <section className={s.root}>
      <h3 className={s.heading}>Store Overview</h3>
      <div className={s.productsContainer}>
        {data.map((product) => (
          <div className={s.product_root} key={product.slug}>
            <Link href={`/shop/${product.slug}`} className={s.link}>
              <div className={s.imgContainer}>
                  <Image
                  src={product.image}
                  alt="IMG-PRODUCT"
                  fill
                  sizes="(max-width: 640px) 100vw, 640px"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  className={s.img} />

                <div className={s.viewProductBtn}>
                  View Details
                </div>
              </div>
              
              <div className={s.descriptionContainer}>
                <div className={s.description}>
                  <div className={s.name}>{product.name}</div>

                  <span className={s.price}>${product.price}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div> 
    </section>
  );
};

export default FeaturedProducts;
