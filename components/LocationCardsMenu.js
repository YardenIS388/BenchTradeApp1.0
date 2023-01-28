import {
  Box,
  Text,
  Center,
  useDisclose,
  ScrollView,
  AspectRatio,
  HStack,
  Stack,
  Heading,
  Pressable,
  Image,
  Badge,
  Modal,
  Button,
  Skeleton,
  VStack,
  Link,
  Popover
} from "native-base";
import { BlurView } from "expo-blur";
import { useState, useEffect } from "react";
import { FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";


const LocationCardsMenu = (props) => {
  const [isTimePressed, setTimePressed] = useState(false);
  const [isLocationPressed, setLocationPressed] = useState(false);
  const [markersList, setMarkersList] = useState(props.listings);

  //filter buttons UI state
  const toggleTimePress = () => {
    if (isLocationPressed) {
      setLocationPressed(false);
    }
    setTimePressed((previousState) => !previousState);
  };
  const toggleLocationPress = () => {
    if (isTimePressed) {
      setTimePressed(false);
    }
    setLocationPressed((previousState) => !previousState);
  };

  useEffect(() => {
 
  }, []);

  return (
    <Box position="absolute" w="100%" bottom="0" bg="rgba(255,255,255,0.5)">
      <BlurView intasity="20">
        <HStack justifyContent="space-between" p="3">
          <Heading>Around You</Heading>
          <HStack borderRadius="full">
            <Pressable
              ml="2"
              mr="2"
              borderRadius="full"
              p="1"
              _pressed={{ bg: "white" }}
              isPressed={isLocationPressed}
              onPress={toggleLocationPress}
            >
              <MaterialIcons name="my-location" size={24} color="black.100" />
            </Pressable>
            <Pressable
              ml="2"
              mr="2"
              borderRadius="full"
              p="1"
              _pressed={{ bg: "white" }}
              _focus={{ bg: "emerald.200" }}
              isPressed={isTimePressed}
              onPress={toggleTimePress}
            >
              <MaterialIcons name="access-time" size={24} color="black" />
            </Pressable>
          </HStack>
        </HStack>
        <ScrollView horizontal={true} h="300" w="100%">
          {
            markersList.map((marker) => {
              return <Card key={marker._id} markerObj={marker}></Card>;
            })
          }
        </ScrollView>
      </BlurView>
    </Box>

    //         </Actionsheet.Content>
    //       </Actionsheet>
    //     </Center>
  )
}

export default LocationCardsMenu;

const Card = (props) => {

  const [showModal, setShowModal] = useState(false);
  const onCardPress = (e) => {
    setShowModal(true);
    // console.log(props.markerObj);
    // console.log(props.markerObj._id);
    // console.log(e.target);
  };
    const lat = props.markerObj.location.coordinates[1]
    const lon = props.markerObj.location.coordinates[0]
    const navLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}` 

  const formatDate = (date) => {
    const dateString = date;
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return formattedDate;
  };

  const getDiffInHours = (dateString) => {
    const dateObject = new Date(dateString);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - dateObject;
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    return diffInHours;
  };


  const removeListing = (listingId) => {
    
    const updatedStatus = 'active';
    axios.put(`https://trade-bench-server.onrender.com/listings/status/${listingId}`, {
      status: updatedStatus
    })
    .then(response => {
      console.log(response);
      setShowModal(false)
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <>
      <Pressable alignItems="center" ml="4" onPress={()=>{setShowModal(true)}} mb="5">
        <Box
          maxW="80"
          w="200"
          h="300"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
          
                source={{
                  uri: props.markerObj.images[0],
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              m="2"
              borderRadius="100"
              bg="emerald.500"
              _dark={{
                bg: "emerald.400",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              <HStack justifyContent="center" alignItems="center">
                <FontAwesome name="location-arrow" size={14} color="white" />
                <Text color="light.100"> {Math.floor(props.markerObj.distance)} km </Text>
              </HStack>
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="sm" ml="-1">
                From: {formatDate(props.markerObj.createdAt)}
              </Heading>
              <Text>{getDiffInHours(props.markerObj.createdAt)} hours ago</Text>
            </Stack>
            <HStack flexWrap>
              {props.markerObj.tags.map((category, index) => {
                return (
                  <Badge
                    h="6"
                    m="1"
                    key={index}
                    variant="outline"
                    colorScheme="emerald"
                  >
                    {category}
                  </Badge>
                );
              })}
            </HStack>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  {props.markerObj.number_of_items} items
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Pressable>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        safeAreaTop={true}
      >
        <Modal.Content w="100%" h="100%">
          <Modal.CloseButton />
          <Modal.Header>Listing Info</Modal.Header>
          <Modal.Body>
            <AspectRatio w="100%" ratio={16 / 9} mb="55">
              <Image
                borderRadius="5"
                source={{
                  uri: props.markerObj.images[0],
                }}
                alt="image"
              />
            </AspectRatio>
            <Heading mt="2" >Listing From: {formatDate(props.markerObj.createdAt)}</Heading>
            <Text mt="2" fontSize="lg"> Distance: {Math.floor(props.markerObj.distance)} km away </Text>
            <Text mt="2"  fontSize="lg">Amount:   {props.markerObj.number_of_items} </Text>
            <Text mt="2"  fontSize="lg">Last Updated: {formatDate(props.markerObj.updatedAt)} </Text>
          </Modal.Body>
          <Modal.Footer justifyContent="space-between" h="20">
            <Pressable
              w="30%"
              h="90%"
              flexDirection="row"
              alignItems="center"
              bg="emerald.300"
              borderWidth="2"
              borderColor="emerald.400"
              borderRadius="5"
              pl="1"
              _pressed={
                {bg:"emerald.500"}
              }
            >
              <AntDesign name="tagso" size={24} color="text.900" />
              <Text> Grab Item </Text>
            </Pressable>
            <Link href= {navLink}
                  bg="primary.100" 
                  w="30%" 
                  h="90%" 
                  color="black" 
                  justifyContent="center" 
                  alignItems="center" 
                  borderColor="primary.400" 
                  borderWidth="2" 
                  rounded="sm"
                  _pressed={
                {bg:"primary.500"}
              }> 
                  <MaterialCommunityIcons name="navigation-variant-outline" size={22} color="black" />
                  Navigate
              </Link>
            <Pressable
              w="30%"
              h="90%"
              flexDirection="row"
              alignItems="center"
              bg="red.300"
              borderWidth="2"
              borderColor="red.400"
              borderRadius="5"
              pl="1"
              _pressed={{bg:"red.500"}}
              onPress={()=>{removeListing(props.markerObj._id)}}
            >
              <MaterialIcons name="block" size={22} color="black" />
              <Text> Not There </Text>
            </Pressable>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
