import Link from 'next/link';
import s from './Sidebar.module.css'
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
// import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
// import AddCardIcon from "@mui/icons-material/AddCard";
// import QueryStatsIcon from "@mui/icons-material/QueryStats";
// import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
// import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import SettingsInputCompositeOutlinedIcon from "@mui/icons-material/SettingsInputCompositeOutlined";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import FaceIcon from "@mui/icons-material/Face";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { NavLink} from "react-router-dom"

const Sidebar = () => {

  return (
    <div className={s.sidebar}>
      <div className={s.top}>
        <Link href="/">
          <span className={s.logo}>natours admin</span>
        </Link>
      </div>
      <hr className={s.line} />
      <div className={s.center}>
        <ul>
          <p className={s.title}>MAIN</p>
          <Link href="/">
            <li className={s.listItem}>
              {/* <DashboardIcon className={s.icon} /> */}
              <span className={s.listText}>Dashboard</span>
            </li>
          </Link>
          <p className={s.title}>LIST</p>
          <Link href="/users">
            <li className={s.listItem}>
              {/* <SupervisedUserCircleOutlinedIcon className={s.icon} /> */}
              <span className={s.listText}>Users</span>
            </li>
          </Link>
          <Link href="/products">
            <li className={s.listItem}>
              {/* <StoreOutlinedIcon className={s.icon} /> */}
              <span className={s.listText}>Products</span>
            </li>
          </Link>
          <Link href="/orders">
            <li className={s.listItem}>
              {/* <AddCardIcon className={s.icon} /> */}
              <span className={s.listText}>Orders</span>
            </li>
          </Link>
          <p className={s.title}>USEFUL</p>
          <Link href="/stats">
            <li className={s.listItem}>
              {/* <QueryStatsIcon className={s.icon} /> */}
              <span className={s.listText}>Stats</span>
            </li>
          </Link>
          <Link href="/delivery">
            <li className={s.listItem}>
              {/* <DeliveryDiningOutlinedIcon className={s.icon} /> */}
              <span className={s.listText}>Delivery</span>
            </li>
          </Link>
          <Link href="/notifications">
            <li className={s.listItem}>
              {/* <NotificationsActiveOutlinedIcon className={s.icon} /> */}
              <span className={s.listText}>Notifications</span>
            </li>
          </Link>
          <p className={s.title}>SERVICE</p>
          <Link href="/system-health">
            <li className={s.listItem}>
              {/* <SettingsSystemDaydreamOutlinedIcon className={s.icon} /> */}
              <span className={s.listText}>System Health</span>
            </li>
          </Link>
          <Link href="/logs">
            <li className={s.listItem}>
              {/* <LockOpenIcon className={s.icon} /> */}
              <span className={s.listText}>Logs</span>
            </li>
          </Link>
          <Link href="/settings">
            <li className={s.listItem}>
              {/* <SettingsInputCompositeOutlinedIcon className={s.icon} /> */}
              <span className={s.listText}>Settings</span>
            </li>
          </Link>
          <p className={s.title}>USER</p>
          <Link href="/profile">
            <li className={s.listItem}>
              {/* <FaceIcon className={s.icon} /> */}
              <span className={s.listText}>Profile</span>
            </li>
          </Link>
          <Link href="/logout">
            <li className={s.listItem}>
              {/* <LogoutIcon className={s.icon} /> */}
              <span className={s.listText}>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar