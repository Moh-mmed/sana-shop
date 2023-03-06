import { NextPage } from 'next';
import Link from 'next/link';
import {HiOutlineUsers,HiOutlineCurrencyDollar} from 'react-icons/hi'
import { MdKeyboardArrowUp,MdOutlineShoppingCart,MdOutlineDeliveryDining } from 'react-icons/md'

import s from './Widget.module.css'

type PropsTypes = {
    section: "users"|"orders"|"earnings"|"products",
    value:string,
    link:string,
    changePercentage:number,
}

const icons: Record<string, () => JSX.Element> = {
    users: ()=>(<HiOutlineUsers
            className={s.icon}
            style={{
                color: "#EC994B",
                backgroundColor: "rgba(236, 153, 75, 0.25)",
            }}
        />),  
    orders: ()=>(<MdOutlineDeliveryDining 
            className={s.icon}
            style={{
                color: "#6523e0",
                backgroundColor: "#6523e039",
            }}
        />),  
    earnings: ()=>(<HiOutlineCurrencyDollar
            className={s.icon}
            style={{
                color: "#6BCB77",
                backgroundColor: "rgba(107, 203, 119, 0.25)",
            }}
            />),
    products: ()=>(<MdOutlineShoppingCart 
            className={s.icon}
            style={{
                color: "#EB5353",
                backgroundColor: "rgba(235, 83, 83, 0.25)",
            }}
        />),
}

const Widget:NextPage<PropsTypes> = ({section, value='$ 200', link='all users',changePercentage=20}) => {

  return (
    <div className={s.root}>
      <div className={s.left}>
        <span className={s.title}>{section}</span>
        <span className={s.counter}>
          {value}
        </span>
        <Link href={`/admin/${section}`} className={s.link}>view {link}</Link>
      </div>
      <div className={s.right}>
        <div className={`${s.percentage} ${s.positive}`}>
          <MdKeyboardArrowUp />
          {changePercentage}%
        </div>
        {icons[section]()}
      </div>
    </div>
  );
}

export default Widget