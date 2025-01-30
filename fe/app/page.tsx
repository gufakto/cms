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
    <main className="bg-blue-900 font-sans">
        <header className="flex items-center justify-between px-8 py-4 bg-blue-900 text-white">
          <h1 className="text-2xl font-bold">Radix</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:underline">Services</a>
            <a href="#" className="hover:underline">Industries</a>
            <a href="#" className="hover:underline">Our Vision</a>
            <a href="#" className="hover:underline">Our Clients</a>
            <a href="#" className="hover:underline">Insights</a>
          </nav>
          <button className="px-4 py-2 bg-white text-blue-900 rounded-md">Contact</button>
        </header>

        <section className="text-center text-white px-8 py-20">
          <h2 className="text-4xl font-bold">Bringing the 'I' in Artificial Intelligence</h2>
          <p className="mt-4 text-lg">Together, we deliver impactful AI solutions that your users will love.</p>
          <div className="mt-10 flex justify-center">
            <img src="/mnt/data/image.png" alt="AI Illustration" className="rounded-md shadow-lg" />
          </div>
        </section>

        <section className="bg-blue-800 py-8">
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex justify-around">
              <a href="#" className="text-white hover:underline">Fairness in AI</a>
              <a href="#" className="text-white hover:underline">A Successful AI Project</a>
              <a href="#" className="text-white hover:underline">AI and Life Sciences</a>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900">We define, design and develop human-centered AI solutions.</h3>
            <p className="mt-4 text-gray-600">Our mission is to help our clients grow and to improve people's lives. We empower organizations with AI, leading them to increased productivity and profitability.</p>
          </div>
        </section>
    </main>
  );
}
