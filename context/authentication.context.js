import React, { createContext,useState, useMemo } from "react";



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
  // console.log(photo)
  const setNewPhoto = (currentPhoto) => {
     // console.log("|callinf setNewPhoto")
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


export const LocationContext = createContext({location: null})
export const LocationProvider = ({children }) => {

  const [location, setLocation] = useState({})
  const setNewLocation = (currentLocation) => {
      //console.log("|calling setNewLocation")
      setLocation((location) => ({
          location: currentLocation,
          loaded: 0
      })
    )
  }

  const clearLocation = () => {
      setLocation((location) => ({
        location: null
      }));
    };

    const providerValue = useMemo(() => ({ location, setNewLocation, clearLocation }), [location]);

  return (
      <LocationContext.Provider value = {providerValue}>
          {children}
      </LocationContext.Provider>
  )
}


export const RenderContext = createContext({})
export const RenderProvider = ({children }) => {

  const [render, setRender] = useState({})
  const setRenderNow = (currentLocation) => {
      //console.log("new response context")
      setRender((response) => ({ response })
    )
  }



  return (
      <RenderContext.Provider value = {{render, setRenderNow}}>
          {children}
      </RenderContext.Provider>
  )
}