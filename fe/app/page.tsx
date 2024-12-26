import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ['latin'],
  weight: ["600"], 
});

export default function Home() {
  
  return (
    <main className="flex h-full flex-col items-center justify-center bg-skew bg-gradient-to-r from-blue-400 to-blue-500">
        <div className='space-y-6 text-center'>
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>
            🔐 Auth
        </h1>
        <p className='text-white text-lg'>A simple authentication service</p>
        <LoginButton>
        <Button variant={"secondary"} size={"lg"} className='mt-4'>
            Sign In
        </Button>
        </LoginButton>
        </div>
    </main>
  );
}
