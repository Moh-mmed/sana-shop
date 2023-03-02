import Link from 'next/link';
import s from './Sidebar.module.css'
import {MdOutlineDeliveryDining,MdStorefront, MdOutlineDashboard,MdQueryStats,MdOutlineNotificationsActive,MdLockOpen,MdOutlineSettingsInputComponent,MdFaceUnlock,MdLogout} from 'react-icons/md'
import {HiOutlineUsers} from 'react-icons/hi'
import {BsCreditCard} from 'react-icons/bs'

const Sidebar:React.FC = () => {

  return (
    <div className={s.root}>
      <ul>
        <p className={s.title}>MAIN</p>
        <Link href="/admin/dashboard">
          <li className={s.listItem}>
            <MdOutlineDashboard className={s.icon} />
            <span className={s.listText}>Dashboard</span>
          </li>
        </Link>
        <p className={s.title}>LIST</p>
        <Link href="/admin/users">
          <li className={s.listItem}>
            <HiOutlineUsers className={s.icon} />
            <span className={s.listText}>Users</span>
          </li>
        </Link>
        <Link href="/admin/products">
          <li className={s.listItem}>
            <MdStorefront className={s.icon} />
            <span className={s.listText}>Products</span>
          </li>
        </Link>
        <Link href="/admin/orders">
          <li className={s.listItem}>
            <BsCreditCard className={s.icon} />
            <span className={s.listText}>Orders</span>
          </li>
        </Link>
        <p className={s.title}>USEFUL</p>
        <Link href="/admin/stats">
          <li className={s.listItem}>
            <MdQueryStats className={s.icon} />
            <span className={s.listText}>Stats</span>
          </li>
        </Link>
        <Link href="/admin/delivery">
          <li className={s.listItem}>
            <MdOutlineDeliveryDining className={s.icon} />
            <span className={s.listText}>Delivery</span>
          </li>
        </Link>
        <Link href="/admin/notifications">
          <li className={s.listItem}>
            <MdOutlineNotificationsActive className={s.icon} />
            <span className={s.listText}>Notifications</span>
          </li>
        </Link>
        <p className={s.title}>SERVICE</p>
        <Link href="/admin/logs">
          <li className={s.listItem}>
            <MdLockOpen className={s.icon} />
            <span className={s.listText}>Logs</span>
          </li>
        </Link>
        <Link href="/admin/settings">
          <li className={s.listItem}>
            <MdOutlineSettingsInputComponent className={s.icon} />
            <span className={s.listText}>Settings</span>
          </li>
        </Link>
        <p className={s.title}>USER</p>
        <Link href="/admin/profile">
          <li className={s.listItem}>
            <MdFaceUnlock className={s.icon} />
            <span className={s.listText}>Profile</span>
          </li>
        </Link>
        <Link href="/admin/logout">
          <li className={s.listItem}>
            <MdLogout className={s.icon} />
            <span className={s.listText}>Logout</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar