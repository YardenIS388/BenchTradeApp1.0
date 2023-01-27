import { StyleSheet } from "react-native";
import { View, VStack, Spinner, Text } from "native-base";
import { useState, useEffect, useContext } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import LocationCardsMenuSkeleton from "../components/LocationCardsSkeleton";
import LocationCardsMenu from "../components/LocationCardsMenu";
import MenuComponent from "../components/Menu";
import axios from "axios";
import { LocationContext } from "../context/authentication.context";

const findAllListings = "https://trade-bench-server.onrender.com/listings";
export default function MapScreen({navigation}) {
  const { setNewLocation } = useContext(LocationContext)
  const { location } = useContext(LocationContext)
  const [listings, setListings] = useState([])
  const [mapRegion, setMapRegion] = useState(null)
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false)

  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    getLocationAsync();
    if(location.location){ 

       const lat = location.location.coords.latitude
       const lon = location.location.coords.longitude

       fetchListingsWithDistance(lat, lon);
    }
  }, [location, navigation.params]);


  const handleMapRegionChange = (region) => {
    // console.log(region);
  };

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationResult("Permission to access location was denied");
    } else {
      setHasLocationPermissions(true);
    }

    let location = await Location.getCurrentPositionAsync({})
  
      setNewLocation(location);
    
    // Center the map on the location we just fetched.
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const fetchListings = async () => {
    try {
      const listingsRequest = await axios({
        method: "GET",
        url: findAllListings,
        withCredentials: true,
      });
      setListings(...listingsRequest.data);
    } catch (error) {
      //console.log("error from fetch listings fetch ");
      console.log(error);
    }
  };

  const fetchListingsWithDistance = async (lat, lon) => {
      const listingsRequest = await axios({
          method: "GET",
          url: `https://trade-bench-server.onrender.com/listings/nearest?lat=${lat}&lon=${lon}`,
          withCredentials: true,
      }).
      then((response) => {
          setListings(response.data)
          setLoadingListings(false)
      })
      .catch( error => {
          console.log(error)
      })
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider="google"
        region={mapRegion}
        onRegionChange={handleMapRegionChange}
        showsUserLocation={true}
      >
        { 
          console.log(listings)
          }{
          listings.map((listing, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: listing.location.coordinates[0], longitude:listing.location.coordinates[1] }}
                image={{uri: "https://res.cloudinary.com/dv2klfl7h/image/upload/v1674826519/marker_vf3yuv.png"}}
                title={listing._id}
                // onPress={onPinPress}
              />
            ))
          }
      </MapView>

      <MenuComponent></MenuComponent>
      {

        loadingListings ? 
        <LocationCardsMenuSkeleton> </LocationCardsMenuSkeleton>
        :
        <LocationCardsMenu listings={listings ? listings : null}> </LocationCardsMenu>
      }
   
    </View>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  map: {
    flex: 1,
  },
});
