import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useRouter } from "next/router";
import s from './Header.module.css'
import { UserTypes } from "../../types/UserTypes";

const Header: React.FC = () => {

  const cart = useSelector((state:any) => state.cart);
  const { status, data: session } = useSession();
  const {user}:any = session
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('/')
  const { pathname } = useRouter();
  const handleDropdownClick = () =>  setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a: any, c: any) => a + c.quantity, 0));
    setCurrentPage(pathname)
  }, [cart.cartItems, pathname]);


  return (
    <header className={s.root}>
      {/* Top Bar */}
      <div className={s.topBar}>
        <div>Free shipping for standard order over $100</div>

        <div className={s.topBar_tabs}>
          <a href="#" className={s.topBar_tab}>
            Help & FAQs
          </a>
          
          <a href="#" className={s.topBar_tab}>
            EN
          </a>

          <a href="#" className={s.topBar_tab}>
            USD
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className={s.navbar}>
        <div className={s.navbar_leftSide}>
          <Link href="/"className={s.navbar_logo}>
            Sana Shop
          </Link>
          <ul className={s.navbar_headMenu}>
            <li className={s.headMenu_item}>
              <Link href="/" className={`${currentPage ==='/' && 'text-[#6c7ae0]'}`}>
                Home
              </Link>
            </li>

            <li className={s.headMenu_item}>
              <Link href="/shop" className={`${currentPage ==='/shop' && 'text-[#6c7ae0]'}`}>
                Shop
              </Link>
            </li>

            <li className={s.headMenu_item}>
              <Link href="/blog" className={`${currentPage ==='/blog' && 'text-[#6c7ae0]'}`}>
                Blog
              </Link>
            </li>

            <li className={s.headMenu_item}>
              <Link href="/about" className={`${currentPage ==='/about' && 'text-[#6c7ae0]'}`}>
                About
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Right Part */}
        <div className={s.navbar_leftSide}>
          {status === 'loading'? '': session ?
            (
            <div className={s.tabIcon} onClick={handleDropdownClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#333" className="w-6 h-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
                {isDropdownOpen && <DropdownMenu user={user} />}
            </div>
            )
            :
            (<Link href="/login" className={s.loginBtn}>login</Link>)
          }

          {/* Cart Icon */}
          {!user.isAdmin &&
            <Link href="/cart" className={s.tabIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#333" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className={s.cartBadge}>
                  {cartItemsCount}
                </span>
              )}
            </Link>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
