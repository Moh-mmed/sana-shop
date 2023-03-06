import React from 'react'
import Link from 'next/link'
import s from './DropdownMenu.module.css'
import { signOut } from 'next-auth/react';

type PropsTypes = {
  user: any
}
const DropdownMenu:React.FC<PropsTypes> = ({user}) => {

  const handleLogoutClick = async () => await signOut();

  return (
    <div className={s.root}>
        <div className="py-1">
            {!user.isAdmin && 
              <>
              <Link href="/user/profile" className={s.listItem}>
              Profile
              </Link>
              <Link href="/user/orders-history" className={s.listItem}>
              Order History
              </Link></>
            }
            {user.isAdmin &&
              <Link href="/admin/dashboard" className={s.listItem}>
                Dashboard
              </Link>}
            <button onClick={handleLogoutClick} className={s.listItem}>
              Sign out
            </button>
        </div>
    </div>
  )
}

export default DropdownMenu