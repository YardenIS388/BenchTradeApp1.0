import React, { createContext, useContext, useState } from "react";



export const UserContext = createContext({ name: "" ,token:'', auth: false })

export const UserProvider = ({children }) => {

    const [user, setUser] = useState({name:"" ,token:'', auth: false})

    const login = (currentUser) => {
        setUser((user) => ({
            name: currentUser.name,
            token: currentUser.token, 
            auth: true
        })
      )
    }

    const logout = () => {
        setUser((user) => ({
          name: "",
          token:"",
          auth: false,
        }));
      };

    return (
        <UserContext.Provider value = {{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

