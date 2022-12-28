import React, { useContext } from 'react';
import Login from "../Screens/Login.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "../Screens/MapScreen.js";
import NewListing from "../Screens/NewListingScreen";
import {UserContext} from "../context/authentication.context";

export default function AuthStack() {

  const Stack = createNativeStackNavigator();

  const {user} = useContext(UserContext)
  
  //TODO: load the actual variable to indicate sucssefull login 
  const loggedIn = true
  
    
  return (
    loggedIn ? 

    <Stack.Navigator initialRouteName="MapScreen">
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        headerShown={false}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewListing"
        component={NewListing}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
    :
    //if authData does not exist users will only be able to see the login screen 
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
