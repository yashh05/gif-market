import Navbar from "@/components/Navbar";
import userContext from "@/context/user/userState";
import Link from "next/link";
import { useContext } from "react";
import Typewriter from "typewriter-effect";
export default function Home() {

  return (
    <main className="flex flex-col min-h-screen w-full justify-between  bg-slate-900">
      <Navbar />

        <div className="flex mt-20 justify-around min-h-3/5">
          <div className="font-playfair text-7xl w-3/6 font-bold text-[#EF9595]">
            <Typewriter
              options={{
                strings: ["Unleash Your Emotions with Endless GIFs!"],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <img src="/images/landing-gif.gif" className=" w-[150px]" />
        </div>
        <div className=" self-center mb-14">
          <Link
            href="signup"
            className=" bg-gradient-to-r from-[#EF9595] to-red-400  self-center text-lg font-bold cursor-pointer text-white font-poppins rounded-lg px-8 py-4"
          >
            Get Started
          </Link>
        </div>
    </main>
  );
}
