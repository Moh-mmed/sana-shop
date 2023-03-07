import Link from 'next/link';
import s from './Sidebar.module.css'
import { MdOutlineDeliveryDining, MdStorefront, MdOutlineDashboard, MdQueryStats, MdOutlineNotificationsActive, MdLockOpen, MdOutlineSettingsInputComponent, MdFaceUnlock, MdLogout } from 'react-icons/md'
import {TbHome} from 'react-icons/tb'
import {HiOutlineUsers} from 'react-icons/hi'
import {BsCreditCard} from 'react-icons/bs'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

type PropsTypes = {
  sidebar: boolean,
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>
}


const Sidebar: React.FC<PropsTypes> = ({ setSidebar, sidebar }) => {
  const router = useRouter();
  const handleLogoutClick = async () => await signOut();
  
  const handleLinkClick = ()=> {
    if (window.innerWidth < 768) {
      sidebar && setSidebar(false)
    }
  }
  return (
    <div className={`${s.root} ${!sidebar&& s.rootHidden}`}>
      <ul>
        <Link href="/" onClick={handleLinkClick}>
          <li className={s.listItem}>
            <TbHome className={s.icon} />
            <span className={s.listText}>Home</span>
          </li>
        </Link>
        <p className={s.title}>MAIN</p>
        <Link href="/admin/dashboard" onClick={handleLinkClick}>
          <li className={`${s.listItem} ${router.asPath.includes('dashboard') && s.listItemActive}`}>
            <MdOutlineDashboard className={s.icon} />
            <span className={s.listText}>Dashboard</span>
          </li>
        </Link>
        <p className={s.title}>LIST</p>
        <Link href="/admin/users" onClick={handleLinkClick}>
          <li className={`${s.listItem} ${router.asPath.includes('users') && s.listItemActive}`}>
            <HiOutlineUsers className={s.icon} />
            <span className={s.listText}>Users</span>
          </li>
        </Link>
        <Link href="/admin/products" onClick={handleLinkClick}>
          <li className={`${s.listItem} ${router.asPath.includes('products') && s.listItemActive}`}>
            <MdStorefront className={s.icon} />
            <span className={s.listText}>Products</span>
          </li>
        </Link>
        <Link href="/admin/orders" onClick={handleLinkClick}>
          <li className={`${s.listItem} ${router.asPath.includes('orders') && s.listItemActive}`}>
            <BsCreditCard className={s.icon} />
            <span className={s.listText}>Orders</span>
          </li>
        </Link>
        <p className={s.title}>USEFUL</p>
        <Link href="/admin/stats" onClick={handleLinkClick}>
          <li className={`${s.listItem} ${router.asPath.includes('stats') && s.listItemActive}`}>
            <MdQueryStats className={s.icon} />
            <span className={s.listText}>Stats</span>
          </li>
        </Link>
        <Link href="/admin/delivery" onClick={handleLinkClick}>
          <li className={`${s.listItem} ${router.asPath.includes('delivery') && s.listItemActive}`}>
            <MdOutlineDeliveryDining className={s.icon} />
            <span className={s.listText}>Delivery</span>
          </li>
        </Link>
        <Link href="/admin/notifications" onClick={handleLinkClick}>
          <li className={`${s.listItem} ${router.asPath.includes('notifications') && s.listItemActive}`}>
            <MdOutlineNotificationsActive className={s.icon} />
            <span className={s.listText}>Notifications</span>
          </li>
        </Link>
        <p className={s.title}>SERVICE</p>
        <Link href="/admin/logs" onClick={handleLinkClick}>
          <li className={`${s.listItem} ${ router.asPath.includes('logs') && s.listItemActive}`}>
            <MdLockOpen className={s.icon} />
            <span className={s.listText}>Logs</span>
          </li>
        </Link>
        <Link href="/admin/settings" onClick={handleLinkClick}>
          <li className={`${s.listItem} ${ router.asPath.includes('settings') && s.listItemActive}`}>
            <MdOutlineSettingsInputComponent className={s.icon} />
            <span className={s.listText}>Settings</span>
          </li>
        </Link>
        <p className={s.title}>USER</p>
        <Link href="/admin/profile" onClick={handleLinkClick}>
          <li className={`${s.listItem} ${ router.asPath.includes('profile') && s.listItemActive}`}>
            <MdFaceUnlock className={s.icon} />
            <span className={s.listText}>Profile</span>
          </li>
        </Link>
        <li className={s.listItem} onClick={handleLogoutClick}>
          <MdLogout className={s.icon} />
          <span className={s.listText}>Logout</span>
        </li>
      </ul>
    </div>
  );
}


export default Sidebar