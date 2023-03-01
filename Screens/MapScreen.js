import { StyleSheet } from "react-native";
import { View, VStack, Spinner, Text } from "native-base";
import { useState, useEffect, useContext, useCallback } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import LocationCardsMenuSkeleton from "../components/LocationCardsSkeleton";
import LocationCardsMenu from "../components/LocationCardsMenu";
import MenuComponent from "../components/Menu";
import axios from "axios";
import {
  LocationContext,
  RenderContext,
} from "../context/authentication.context";
import { useFocusEffect } from "@react-navigation/native";

const findAllListings = "https://trade-bench-server.onrender.com/listings";

export default function MapScreen({ navigation }) {
  const { setNewLocation } = useContext(LocationContext);
  const { location } = useContext(LocationContext);
  const { render } = useContext(RenderContext);
  const [listings, setListings] = useState([]);
  const [mapRegion, setMapRegion] = useState(null);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [loadingListings, setLoadingListings] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const emptyArray = [];

  useEffect(() => {
    (async () => {
      //console.log("MapScreen useEffect Trigger");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let coordinate = await Location.getCurrentPositionAsync({});
      //console.log(coordinate);
      setNewLocation(coordinate);
      setMapRegion({
        latitude: coordinate.coords.latitude,
        longitude: coordinate.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      const lat = coordinate.coords.latitude;
      const lon = coordinate.coords.longitude;
      const response = await fetchListingsWithDistance(lat, lon);
      //console.log(response.data)
      //console.log(response.data.length)
      setListings(response.data);
      setLoadingListings(false);
    })();

    //  getLocationAsync()
    //  .then(res => {
    //   console.log(location.location)
    //   if (location.location) {
    //     const lat = location.location.coords.latitude;
    //     const lon = location.location.coords.longitude;
    //     fetchListingsWithDistance(lat, lon);
    //   }
    //  }).catch(error => console.log(error))
  }, [render]);

  const handleMapRegionChange = (region) => {
    // console.log(region);
  };

  // const getLocationAsync = async () => {

  //   let { status } = await Location.requestForegroundPermissionsAsync();

  //   console.log("status "+ status)

  //   if (status !== "granted" ) {
  //     console.log("if")
  //     setLocationResult("Permission to access location was denied");
  //     return
  //   }

  //   let coordinate = await Location.getCurrentPositionAsync({});
  //   if(coordinate != location){
  //     setNewLocation(coordinate);
  //     setMapRegion({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     });
  //   }

  //   // Center the map on the location we just fetched.

  // };

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
    //console.log("fetch listing is called");
    const listingsRequest = await axios({
      method: "GET",
      url: `https://trade-bench-server.onrender.com/listings/nearest?lat=${lat}&lon=${lon}`,
      withCredentials: true,
    });

    return listingsRequest
    // .then((response) => {
    //   setListings(response.data);
    //   setLoadingListings(false);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const mapMarkers = () => {
   // console.log("list");
    if (listings) {
      return listings.map((listing, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(listing.location.coordinates[1]),
            longitude: parseFloat(listing.location.coordinates[0]),
          }}
          description={"This is item posted by a nearby user"}

          // onPress={onPinPress}
        />
      ));
    }
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider="google"
        region={mapRegion}
        onRegionChange={handleMapRegionChange}
        showsUserLocation={true}
      >
        {mapMarkers()}
      </MapView>

      <MenuComponent></MenuComponent>
      {loadingListings ? (
        <LocationCardsMenuSkeleton> </LocationCardsMenuSkeleton>
      ) : (
        <LocationCardsMenu listings={listings}>
          {" "}
        </LocationCardsMenu>
      )}
    </View>
  );
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
