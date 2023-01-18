import { StyleSheet} from "react-native"
import {View, VStack, Spinner, Text} from "native-base"
import {useState , useEffect} from 'react'
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import markerList from '../fakeLocations.json'
import LocationCardsMenu from "../components/LocationCardsMenu";
import MenuComponent from "../components/Menu"
import axios from "axios"

const findAllListings = "http://localhost:8082/listings/list"

export default function MapScreen (){

  const [selectedPin, setSelectedPin] = useState({});
  const [markers, setMarkers] = useState(markerList ? markerList : []); // initial markers state 
  const [listings, setListings] = useState([])
  const [mapRegion, setMapRegion] = useState(null);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [locationResult, setLocationResult] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const handleMapRegionChange = (region) => {
    console.log(region);
    
  };

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocationResult('Permission to access location was denied');
    } else {
      setHasLocationPermissions(true);
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocationResult(JSON.stringify(location));

    // Center the map on the location we just fetched.
    setMapRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  };



  // const getListings = async ()=>{
  //       const listingsFromDB = await axios.get(findAllListings).then(
  //         res => {
  //             console.log(res.data)
  //         }
  //       )
        
  // }

  // useEffect(() => {
  //   (async () => {
      

   const onMarkerPress = (e)=>{
    setSelectedPin(e.nativeEvent.coordinate)
   }



  return(
    !locationResult ?
    <View height="100%" bg="rgba(240, 240, 240,0.2)" width="100%" borderWidth="1" position="absolute">
    <VStack bg="rgba(240, 240, 240,0.2)" space={8} width="100%" height="100%" justifyContent="center" alignItems="center">
      <Spinner size="lg" color="emerald.500" />
      <Text> Loading your map...</Text>
    </VStack>
  </View>
  :
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider="google"
        region={mapRegion}
        onRegionChange={handleMapRegionChange}
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
       
     <MenuComponent></MenuComponent>
     <LocationCardsMenu> </LocationCardsMenu>
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