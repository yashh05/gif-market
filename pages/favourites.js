import Navbar from "@/components/Navbar";
import userContext from "@/context/user/userState";
import { db } from "@/firebaseConfig";
import { Loader } from "@giphy/react-components";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
function Favourites() {
  const router = useRouter();
  const { user, logout } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const [favArray, setFavArray] = useState([]);

  useEffect(() => {
    if (user == null) return;
    const fetchGifs = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "favorites", user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFavArray(docSnap.data().gifArray);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchGifs();
  }, [user]);

useEffect(()=>{
    if(!user){
        window.location.replace("/signin")
    }
})

  const renderGifs = () => {
    if (loading) return <Loader />;
    return favArray.map((el) => {
      return (
        <div className="group relative">
          <div
            key={el.id}
            className="hover:-translate-y-3 transition ease-in-out delay-150 "
          >
            <img src={el.images.fixed_height.url} />
          </div>
        </div>
      );
    });
  };
  
  return (
    <div className="bg-slate-900 w-full min-h-screen">
      <Navbar />
      <p className=" mb-10 text-white text-center underline font-pacifico leading-10 font-bold text-4xl">
        FAVORITES
      </p>
      <div className="flex flex-wrap gap-5 w-4/5 m-auto justify-center ">
        {renderGifs()}
      </div>
    </div>
  );
}

export default Favourites;
