'use client'
import React from 'react'
import style from './navbar.module.css'
import Image from 'next/image'
import { menuItems } from '@/utils/menuItems'
import MenuItems from '@/components/navbar/menuItems/MenuItems'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
      <div className={style.container}>
        <Link href={"/"} className={style.logoLink}>
          <Image
            src="/logo.png"
            alt='logo'
            width={180}
            height={60}
            className={style.logoImg}
          />
        </Link>
        <div>
          <ul className={style.menuItems}>
            {menuItems.map((menu, index) => {
              return <MenuItems items={menu} key={index} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar