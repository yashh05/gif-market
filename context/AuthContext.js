import { createContext , useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from "@/firebaseConfig";

const AuthContext=createContext()

export const useAuth=()=>useContext(AuthContext)

export const AuthContextProvider =({children})=>{

    const [user,setUSer]=useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const unsubscribe= auth().onAuthStateChanged(auth,(user)=>{
           if(user){
            setUSer({
                uid:user.uid,
                email:user.email,
                displayName:user.displayName
            })
           }else{
            setUSer(null)
           }
        })
          setLoading(false)
        return ()=>unsubscribe()
    },[])

const signup=async (email,password)=>{
    const new_user= await createUserWithEmailAndPassword(auth,email,password)
    console.log(new_user);
    return new_user
}

const login=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

const logout= async ()=>{
setUSer(null)
await signOut(auth)
}

return <AuthContext.Provider value={{user , login , logout , signup}} >
    {loading ? null : children}
    </AuthContext.Provider>
}