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
                icon: <AiOutlineUsergroupDelete />,
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
            <div className='' key={i.title}>
                <span className=''>{i.title}</span>
                {i.items.map((item) => 
                    <Link href={item.href} key={item.label} className='border-2 bg-gray-600'>
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                )}
            </div>
        ))}
    </div>
  )
}

export default Menu;