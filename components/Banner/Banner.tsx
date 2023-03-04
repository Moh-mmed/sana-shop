import Link from "next/link";
import React from "react";
import s from './Banner.module.css'

const Banner: React.FC = () => {
  
  return (
    <section>
      <div className={s.bannerContainer}>
          <div className={s.bannerContent}>
            <div>
              <span className={s.bannerContent_head}>Sale</span>
            </div>

            <div>
              <h2 className={s.bannerContent_body}>online and in stores</h2>
            </div>

            <div>
              <Link href="/shop" className={s.bannerContent_button}>
                  Shop Now
              </Link>
            </div>
          </div>
      </div>
    </section>
  );
};


export default Banner;
