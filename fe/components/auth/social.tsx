import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from "react-icons/fa"
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export const Social = () => {



    return (
        <div className="flex items-center w-full gap-x-2">
            <form
            className="w-full" 
            action={async () => {
                await signIn("google", { callbackUrl: "/admin/home" })
            }}
            >
            <Button size={"lg"} className="w-full" variant={"outline"}
                type='submit'
            >
                <FcGoogle className='h-5 w-5'/>
            </Button>
            </form>
            <form
            className="w-full" 
            action={async () => {
                await signIn("github", { callbackUrl: "/admin/home" })
            }}
            >
            <Button size={"lg"} className="w-full" variant={"outline"}
                type='submit'    
            >
                <FaGithub className='h-5 w-5'/>
            </Button>
            </form>
        </div>
    )
}