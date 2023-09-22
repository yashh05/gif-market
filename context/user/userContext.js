import { useEffect, useState } from "react";
import UserContext from "./userState";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";

const UserState = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (Newuser) => {
      console.log("onAuthStateChanged", Newuser?.uid ?? null );
  
      if (Newuser) {
        console.log("User is authenticated:", Newuser.uid);
        const temp={uid: Newuser.uid,email: Newuser.email,displayName: Newuser.displayName};
        setUser(temp);
        console.log(user);
        setSignupError("");
      } else {
        console.log("User is not authenticated.");
        setUser(null);
      }
    });
  
    setLoading(false);
    
    return () => {
      unsubscribe();
    };
  }, []);

  const signup = async (email, password) => {
    
    const pr=new Promise((resolve,reject)=>{
      const details= createUserWithEmailAndPassword(auth, email, password);
      details.then(detail=>{
       resolve(detail);
      })
      .catch(err=>{
       reject(err);
      })
     })

     return pr;

  }

  const login = async (email, password) => {
    
    const pr=new Promise((resolve,reject)=>{
       const details= signInWithEmailAndPassword(auth, email, password);
       details.then(detail=>{
        resolve(detail);
       })
       .catch(err=>{
        reject(err);
       })
      })

      return pr;
    }

  const logout = async () => {
    console.log("logout");
    setUser(null);
    await signOut(auth);
    window.location.replace("/");
  };

  return (
    <UserContext.Provider value={{ user,loading, signup,signupError, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
  }
export default UserState;
