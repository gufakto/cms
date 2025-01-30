import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { 
    AiFillHome, 
    AiFillEdit, 
    AiOutlineUsergroupDelete,
    AiOutlineUsergroupAdd,
    AiFillTool,
    AiOutlineLogout
} from "react-icons/ai";
import { GiFarmer } from "react-icons/gi";


const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: <AiFillHome />,
                label: "Home",
                href: "/admin/home"
            },
            {
                icon: <GiFarmer />,
                label: "Petani",
                href: "/"
            }
        ]
    },
    {
        title: "Others",
        items: [
            {
                icon: <AiFillEdit />,
                label: "Profile",
                href: "/"
            },
            {
                icon: <AiOutlineUsergroupAdd />,
                label: "Users",
                href: "/"
            },
            {
                icon: <AiFillTool/>,
                label: "Setting",
                href: "/"
            },
            {
                icon: <AiOutlineLogout/>,
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
            <div className='bg-green-300' key={i.title}>
                <span className=''>{i.title}</span>
                {i.items.map((item) => 
                    <Link href={item.href} key={item.label} className='flex items-center justify-start'>
                        <div className='pr-1'>{item.icon}</div>
                        <span>{item.label}</span>
                    </Link>
                )}
            </div>
        ))}
    </div>
  )
}

export default Menu;