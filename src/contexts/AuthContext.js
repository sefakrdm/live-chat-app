import { createContext, useEffect, useState, } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [loginUser,setLoginUser] = useState({});

    useEffect(() => {
       const unsub = onAuthStateChanged(auth,(user) => {
        setLoginUser(user);
       })

       return () => {
            unsub();
       }
    },[])

    return (
        <AuthContext.Provider value={{loginUser}}>
            {children}
        </AuthContext.Provider>
    )
}