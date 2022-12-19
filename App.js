import { StyleSheet , View , Text } from 'react-native';
import MapScreen from './Screens/MapScreen';
import Login from './Screens/Login';
import {useState} from 'react'
import NewListingScreen from './Screens/NewListingScreen';
import { NavigationContainer } from '@react-navigation/native'
import HomeStack from './routes/homeStack'
import Stack from './routes/homeStack';
import { NativeBaseProvider, Box } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider >
        <NavigationContainer >
            <Stack/>
        </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
