import React from 'react'
import Link from 'next/link'
import s from './DropdownMenu.module.css'
import { signOut, useSession } from 'next-auth/react';

type PropsTypes = {
  session: any
}
const DropdownMenu:React.FC<PropsTypes> = ({session}) => {
  const handleLogoutClick = async () => await signOut();

  return (
    <div className={s.root}>
        <div className="py-1">
            {!session.user.isAdmin && 
              <>
              <Link href="/user/profile" className={s.listItem}>
              Profile
              </Link>
              <Link href="/user/orders-history" className={s.listItem}>
              Order History
              </Link></>
            }
            {session.user.isAdmin &&
                <>
                <Link href="/admin/profile" className={s.listItem}>
                    Profile
                </Link>
                <Link href="/admin/dashboard" className={s.listItem}>
                    Dashboard
                </Link>
                </>
              }
            <button onClick={handleLogoutClick} className={s.listItem}>
              Sign out
            </button>
        </div>
    </div>
  )
}

export default DropdownMenu