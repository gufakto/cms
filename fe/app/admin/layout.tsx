import Menu from '@/components/admin/menu'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AdminLayout = ({ children }:{ children: React.ReactNode}) => {
  return (
    <div className='h-screen flex'>
        {/* LEFT */}
        <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4'>
          <Link className='flex items-center justify-center lg:justify-start gap-2' href=''>
            <Image src={`https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png`}
              alt='Logo'
              width={32}
              height={32}
            />
            <span className='hidden lg:block'>CMS </span>
          </Link>
          <Menu/>
        </div>
        {/* RIGHT */}
        <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%]'>R</div>
        
        {/* {children} */}
    </div>
  )
}

export default AdminLayout