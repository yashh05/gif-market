import userContext from "@/context/user/userState";
import Link from "next/link";
import React, { useContext } from "react";

function Navbar() {
  const { user, logout } = useContext(userContext);

  return (
    <nav className="flex mb-10 justify-between bg-green-50 bg-opacity-20 text-4xl font-playfair fonr-bold text-white px-10 py-5 w-auto">
      <div className=" font-pacifico">GIF MARKET</div>
      <div className=" flex gap-10">
        {user ? (
          <>
            <Link href="/favourites">Favs</Link>
            <button onClick={() => logout()}>Logout</button>
          </>
        ) : (
          <Link href="/signin" className=" font-sans">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
