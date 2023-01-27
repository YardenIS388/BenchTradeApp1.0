import { StyleSheet} from "react-native"
import {View, VStack, Spinner, Text} from "native-base"
import {useState , useEffect, useContext} from 'react'
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import LocationCardsMenu from "../components/LocationCardsMenu";
import MenuComponent from "../components/Menu"
import axios from "axios"
import { LocationContext } from "../context/authentication.context";

const findAllListings = "https://trade-bench-server.onrender.com/listings"
const findAllListingsWithDistance = "https://trade-bench-server.onrender.com/listings/location?lat=32.088844589919&lon=34.812319474327204"
export default function MapScreen (){

  const { setNewLocation } = useContext(LocationContext);
  const [selectedPin, setSelectedPin] = useState({});
  const [markers, setMarkers] = useState(); // initial markers state 
  const [listings, setListings] = useState([])
  const [listingsByDist, setListingsByDist] = useState([])
  const [mapRegion, setMapRegion] = useState(null);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [locationResult, setLocationResult] = useState(null);
  


  useEffect(() => {
    getLocationAsync()
    if(locationResult){
        console.log(locationResult)
        const temp =  JSON.parse(locationResult)
        fetchListingsWithDistance(32.088844589919, 34.812319474327204)
    }else {
      fetchListings()
    }
  }, [locationResult]);
 
 

  function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
  }

  function calcDistance (startCoords, destCoords){
    let startingLat = degreesToRadians(startCoords.latitude);
    let startingLong = degreesToRadians(startCoords.longitude);
    let destinationLat = degreesToRadians(destCoords.latitude);
    let destinationLong = degreesToRadians(destCoords.longitude);
  
    // Radius of the Earth in kilometers
    let radius = 6571;
  
    // Haversine equation
    let distanceInKilometers = Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
    Math.cos(startingLat) * Math.cos(destinationLat) *
    Math.cos(startingLong - destinationLong)) * radius;
  
    return distanceInKilometers;
  }


  const handleMapRegionChange = (region) => {
   // console.log(region);
    
  };

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocationResult('Permission to access location was denied');
    } else {
      setHasLocationPermissions(true);
    }

    let location = await Location.getCurrentPositionAsync({});

    setNewLocation(location)
    setLocationResult(JSON.stringify(location));

    // Center the map on the location we just fetched.
    setMapRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  };

  const fetchListings = async () => {
      try {
       const  listingsRequest = await axios({
          method: 'GET',
          url: findAllListings,
          withCredentials: true,
        })       
          setListings(listingsRequest.data)
      }
      catch(error){
        console.log("error from fetch listings fetch ")
        console.log(error)
      }
  }

  const fetchListingsWithDistance = async (lat , lon) => {
    try {
     const  listingsRequest = await axios({
        method: 'GET',
        url: findAllListingsWithDistance,
        withCredentials: true,
      })       
        setListings(listingsRequest.data)
    }
    catch(error){

      console.log("error from fetch listings fetch by distance  ")
      console.log({error})
    }
}

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
    const event =  e.nativeEvent
    //console.log(event)
    //setSelectedPin(e.nativeEvent.coordinate)
   }

  
 //console.log(listings)
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
        {  listings ? listings.map((listing, index) => (
          <Marker
            key={listing._id}
            coordinate={{latitude:listing.lat, longitude:listing.lon}}
            title={listing._id}
            description={listing.tags.map((tag, index)=>(tag))}

            // onPress={onPinPress}
            />
        )):[]}
      </MapView>
       
     <MenuComponent></MenuComponent>
     <LocationCardsMenu listings={listings ? listings : []}> </LocationCardsMenu>
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