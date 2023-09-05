import Link from "next/link";
import Typewriter from "typewriter-effect";
export default function Home() {
  return (
    <main className="flex flex-col py-10 px-32 min-h-screen w-full justify-between bg-[#EBEF95]">
      <div className="  self-center flex items-center ">
        <h1 className="text-7xl text-[#FF9B50] font-pacifico ">GIF MARKET</h1>
      </div>
      <div className="flex justify-between  items-start">
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
      <div className=" self-center">
        <Link href="signup" className=" bg-gradient-to-r from-[#EF9595] to-red-400  self-center text-lg font-bold cursor-pointer text-white font-poppins rounded-lg px-8 py-4">
          Get Started
        </Link>
      </div>
    </main>
  );
}
