import { StyleSheet, View  } from "react-native"
import {useState , useEffect} from 'react'
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import markerList from '../fakeLocations.json'
import LocationCardsMenu from "../components/LocationCardsMenu";


export default function MapScreen (){


  const [selectedPin, setSelectedPin] = useState({});
  const [markers, setMarkers] = useState(markerList ? markerList : []); // initial markers state 
  const [location, setLocation] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroudPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
        }

        let position = await Location.getCurrentPositionAsync({});
        setLocation(position);
        console.log("true")
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


   const onMarkerPress = (e)=>{
    setSelectedPin(e.nativeEvent.coordinate)
   }

  return(
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={{
          latitude: location.coords ? location.coords.latitude : 32.08897,
          longitude: location.coords ? location.coords.longitude : 34.81254,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        region={{
          latitude: selectedPin  ? selectedPin.latitude : 32.08897,
          longitude: selectedPin ? selectedPin.longitude : 34.81254,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onMarkerPress={onMarkerPress}
        showsUserLocation={true}>
        {  markers ? markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.address.geo}
            title={marker.name}
            description={marker.zipcode}
            // onPress={onPinPress}
            />
        )):[]}
      </MapView>
     <LocationCardsMenu markers={markers ? markers : []}></LocationCardsMenu>
    </View>
  )
}


const styles = StyleSheet.create({
    mapContainer:{
        flex:1,
        width:'100%',
        height:'100%',
    },
    map:{
        flex:1,
        
    }
})