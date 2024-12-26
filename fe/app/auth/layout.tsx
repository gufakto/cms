import React from 'react'

const AuthLayout = ({ children }:{ children: React.ReactNode}) => {
  return (
    <div className='w-full flex items-center justify-center h-full bg-skew bg-gradient-to-r from-blue-400 to-blue-500'>
        {children}
    </div>
  )
}

export default AuthLayout