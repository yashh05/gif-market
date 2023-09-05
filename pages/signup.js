import userContext from "@/context/user/userState";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from 'next/router'

function Signup() {
  const router=useRouter()
  const { signup, logout } = useContext(userContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = new FormData(signupForm);

    try {
      await signup(data.get("email"), data.get("password"));
      router.push("/home")
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignout = async (e) => {
    try {
      logout();
    } catch (e) {
      console.log(e);
    }
  };

  return <div class=" h-[100vh] p-8 flex bg-gradient-to-r from-[#FAB2FF] to-[#1904E5] ">
    <div className=" md:w-3/6 m-auto h-auto  bg-white rounded-lg">
       <form className="flex flex-col gap-8 px-2 py-5 md:px-12 md:py-20 " id="signupForm" onSubmit={handleSignup}>
        <p className="text-center text-slate-600 text-4xl font-bold ">Signup</p>
        <p>Already have an account? <Link href="/signin" className=" text-blue-700"> Sign In</Link> </p>
           
        <input placeholder="Email" type="text" className=" focus:outline-none border-b focus:border-gray-500 text-lg " name="email" />   
        <input placeholder="Password" type="password" className=" focus:outline-none border-b focus:border-gray-500 text-lg" name="password" />   

        <button type="Submit" className=" text-white text-xl bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500  rounded-full px-6 py-2 self-center  md:w-48" >Sign up</button>
       </form>
    </div>
  </div>;
}

export default Signup;
