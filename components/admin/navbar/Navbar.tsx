import Image from 'next/image';
import s from './Navbar.module.css'
import {MdOutlineNotificationsActive} from 'react-icons/md'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { CiSearch } from 'react-icons/ci'
import Link from 'next/link';

type PropsTypes = {
  sidebar: boolean,
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<PropsTypes> = ({setSidebar, sidebar}) => {

  return (
    <div className={s.root}>
        <div className={s.wrapper}>
          <div className={s.leftSide}>
              <Link href="/"className={s.navbar_logo}>
              Sana Shop
            </Link>
            <div className={s.search}>
            <input className={s.searchInput} type="text" placeholder="Search..." />
            <CiSearch className={s.searchIcon}/>
            </div>
          </div>
        
        <div className={s.items}>
          <div className={s.menuBtn} onClick={()=>(setSidebar(!sidebar))}>
            <HiOutlineMenuAlt2 className={s.icon} />
          </div>
          <div className={s.item}>
            <MdOutlineNotificationsActive className={s.icon} />
            <div className={s.counter}>1</div>
          </div>
          <div className={s.item}>
            <IoChatbubbleEllipsesOutline className={s.icon} />
            <div className={s.counter}>2</div>
          </div>
          <div className={s.item}>
            <Image className={s.avatar} src="https://picsum.photos/50" width={30} height={30} alt="user" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar