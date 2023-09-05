import { AuthContextProvider } from "@/context/AuthContext";
import UserState from "@/context/user/userContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserState>
      <Component {...pageProps} />
    </UserState>
  );
}
