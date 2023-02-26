import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import s from './CategoryPicker.module.css'

const CategoryPicker: React.FC = () => {
  const router = useRouter()
  return (
      <div className={s.root}>
        <div className={s.category}>
          <Image
              src="/images/banner-04.jpg"
              alt="IMG-BANNER"
              width={100}
              height={100}
              sizes="(max-width: 640px) 100vw, 640px"
              style={{ objectFit: "cover" }}
              className={s.category_img} />

            <button className={s.category_button} onClick={()=>router.push('/shop?gender=woman')}>
              <div className={s.category_button_upperPart}>
                <span className={s.upperPart_first}>Woman</span>

                <span className={s.upperPart_second}>Spring 2022</span>
              </div>

              <div className={s.category_button_downPart}>
                <div className={s.downPart_first}>Shop Now</div>
              </div>
            </button>
      </div>
      

      <div className={s.category}>
        <Image
            src="/images/banner-05.jpg"
            alt="IMG-BANNER"
            width={100}
            height={100}
            sizes="(max-width: 640px) 100vw, 640px"
            style={{ objectFit: "cover" }}
            className={s.category_img} />

          <button className={s.category_button} onClick={()=>router.push('/shop?gender=man')}>
            <div className={s.category_button_upperPart}>
              <span className={s.upperPart_first}>Man</span>

              <span className={s.upperPart_second}>Spring 2022</span>
            </div>

            <div className={s.category_button_downPart}>
              <div className={s.downPart_first}>Shop Now</div>
            </div>
          </button>
      </div>
    </div>
  );
};

export default CategoryPicker;
