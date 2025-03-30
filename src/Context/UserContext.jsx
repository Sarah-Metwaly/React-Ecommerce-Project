import { createContext, useState } from "react";

export let UserContext=createContext();

export default function UserContextProvider(props){

    const[UserLogin,SetUserLogin]=useState(localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null);

    return <UserContext.Provider value={{UserLogin,SetUserLogin}}>
        {props.children}
    </UserContext.Provider>
}