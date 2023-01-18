import React, { createContext,useState } from "react";



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

export const CameraContext = createContext({photo: null})
export const CameraProvider = ({children }) => {

  const [photo, setPhoto] = useState({})
  console.log(photo)
  const setNewPhoto = (currentPhoto) => {
      console.log("|callinf setNewPhoto")
      setPhoto((photo) => ({
          photo: currentPhoto
      })
    )
  }

  const clearPhoto = () => {
      setPhoto((photo) => ({
        photo: null
      }));
    };

  return (
      <CameraContext.Provider value = {{photo, setNewPhoto, clearPhoto}}>
          {children}
      </CameraContext.Provider>
  )
}