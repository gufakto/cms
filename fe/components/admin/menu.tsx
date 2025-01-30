import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: "Home",
                label: "Home",
                href: "/admin/home"
            },
            {
                icon: "Petamin",
                label: "Petani",
                href: "/"
            }
        ]
    },
    {
        title: "Others",
        items: [
            {
                icon: "profile",
                label: "Profile",
                href: "/"
            },
            {
                icon: "logout",
                label: "Logout",
                href: "/"
            }
        ]
    }
]

const Menu = () => {
  return (
    <div>
        {menuItems.map((i)=> (
            <div className='' key={i.title}>
                <span className=''>{i.title}</span>
                {i.items.map((item) => (
                    <Link href={item.href} key={item.label}>
                        <Image src={item.icon} alt={item.label} width={20} height={20} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Menu;