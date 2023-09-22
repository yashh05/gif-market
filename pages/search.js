import Giphy from "@/components/Giphy";
import Navbar from "@/components/Navbar";
import userContext from "@/context/user/userState";
import { useContext, useEffect } from "react";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "@/firebaseConfig";

function Search() {
  const {user} = useContext(userContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (Newuser) => {
      if (!Newuser) {
        window.location.replace("/signin")
      }
    });    
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <div className="bg-slate-900 min-h-screen">
      {/* <div className="flex justify-between mb-20 bg-green-50 bg-opacity-20 text-4xl font-playfair fonr-bold text-white rounded-lg px-10 py-3 w-auto">
        <div className=" font-pacifico">GIF MARKET</div>
        <div className=" flex gap-10">
          <Link href="/favourites">Favs</Link>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div> */}
      <Navbar />
      <Giphy />
    </div>
  );
}

export default Search;
