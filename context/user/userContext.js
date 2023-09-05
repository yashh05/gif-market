import { useEffect, useState } from "react";
import UserContext from "./userState";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const UserState=(props)=>{

    const [user, setUser] = useState(null)
    const [loading ,setLoading] = useState(true)


    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
           if(user){
            setUser({
                uid:user.uid,
                email:user.email,
                displayName:user.displayName
            })
           }else{
            setUser(null)
           }
        })
          setLoading(false)
        return ()=>unsubscribe()
    },[])

    const signup=async (email,password)=>{
        console.log(email , password);
        const new_user= await createUserWithEmailAndPassword(auth,email,password)
        console.log(new_user);
        return new_user
    }
    
    const login=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    
    const logout= async ()=>{
        console.log("logout");
    setUser(null)
    await signOut(auth)
    }
    

    return (
        <UserContext.Provider value={{user,signup,login,logout}} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;