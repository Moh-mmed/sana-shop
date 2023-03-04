import React from "react";
import { ProductTypes } from "../../types/ProductTypes";
import ProductItem from "../ProductItem/ProductItem";
import s from './RelatedProducts.module.css'

type RelatedProductsType = {
  data: ProductTypes[]
}

const RelatedProducts: React.FC<RelatedProductsType> = ({data}) => {
  return (
    <section className={s.root}>
      <h3 className={s.heading}>Related Products</h3>
      <div className={s.productsContainer}>
        {data.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
          ></ProductItem>
        ))}
      </div> 
    </section>
  );
};

export default RelatedProducts;
