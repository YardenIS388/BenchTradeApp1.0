  import MapScreen from '../Screens/MapScreen.js'
  import NewListing from '../Screens/NewListingScreen'
  import Login from '../Screens/Login.js'
  import { createAppContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
  export default function Stack(){

  const Stack = createNativeStackNavigator();
  const screens = {
    Home: {
        screen: Login
    },
    HomeScreen:{
        screen: MapScreen
    },
    NewListing:{
        screen: NewListing
    }
   }

  

   return (
          <Stack.Navigator initialRouteName='MapScreen'>
                <Stack.Screen 
                    name ="Login" 
                    component={Login}
                    options={{
                        headerShown:false
                    }}   
                    />
                <Stack.Screen 
                    name ="MapScreen" 
                    component={MapScreen}
                    headerShown={false}
                    options={{
                        headerShown:false
                    }}
                    />
                <Stack.Screen 
                    name ="NewListing" 
                    component={NewListing}
                    options={{
                        headerShown:false
                    }}
                    />
          </Stack.Navigator>

    
  
   )
  

}


