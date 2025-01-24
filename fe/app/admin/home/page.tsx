import { getServerSession, Session } from 'next-auth';
import React from 'react'
import { authOptions } from '@/lib/auth';


const HomePage = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
    console.log(session);
  return (
    <div>HomePage</div>
  )
}


export default HomePage;
