import React from 'react'
import Link from 'next/link'
import s from './DropdownMenu.module.css'


type PropsTypes = {
    onClick: ()=>void
}
const DropdownMenu = ({onClick}:PropsTypes) => {
  return (
    <div className={s.root}>
        <div className="py-1">
            <Link href="/profile" className={s.listItem}>
            Profile
            </Link>
            <Link href="/orders-history" className={s.listItem}>
            Order History
            </Link>
            <button onClick={onClick} className={s.listItem}>
            Sign out
            </button>
        </div>
    </div>
  )
}

export default DropdownMenu