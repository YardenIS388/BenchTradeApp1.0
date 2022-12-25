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
  Button
} from "native-base";
import { BlurView } from 'expo-blur';
import { useState, useEffect } from "react";
import { FontAwesome, MaterialIcons, AntDesign} from "@expo/vector-icons";
import sortedMarkers from "../sortedLocations.json"
import notSortedMarkers from "../fakeLocations.json"

const LocationCardsMenu = (props) => {

  const [isTimePressed, setTimePressed] = useState(false);
  const [isLocationPressed, setLocationPressed] = useState(false);
  const [markersList, setMarkersList] = useState(notSortedMarkers)

  //filter buttons UI state 
  const toggleTimePress = () => { 
        
        if(isLocationPressed){
            setLocationPressed(false)
        }
        setTimePressed((previousState) => !previousState)
      }
  const toggleLocationPress = () => {
          if(isTimePressed){
              setTimePressed(false)
          }
         setLocationPressed((previousState) => !previousState)
  }

useEffect(()=>{
  if(isTimePressed){
    setMarkersList(sortedMarkers)
  } else {
    setMarkersList(notSortedMarkers)
  }
})

  return (
    // <Center>
    //   <Pressable onPress={onOpen} position="absolute" bottom="50" borderRadius="full" bg="white" borderWidth="1" borderColor="light.200" p="3" shadow="4">
    //       <MaterialCommunityIcons name="view-carousel-outline" size={50} color="black" />
    //   </Pressable>
    //   <Actionsheet isOpen={isOpen} onClose={onClose} >
    //     <Actionsheet.Content>
   
          <Box  position="absolute" bottom="0" bg="rgba(255,255,255,0.5)">
            <BlurView intasity="20">
            <HStack
              justifyContent="space-between"
              p="3"
            >
              <Heading>Around You</Heading>
              <HStack borderRadius="full">
                <Pressable ml="2" mr='2' borderRadius="full" p="1"
                            _pressed={{bg:'white'}}
                            isPressed={isLocationPressed}
                           onPress={toggleLocationPress}
                            >
                  <MaterialIcons
                    name="my-location"
                    size={24}
                    color="black.100"
                  />
                </Pressable>
                <Pressable ml="2" mr="2" borderRadius="full" p="1"
                           _pressed={{bg:'white'}}
                           _focus={{bg:'emerald.200'}}
                           isPressed={isTimePressed}
                           onPress={toggleTimePress}
                            >
                  <MaterialIcons 
                    name="access-time" 
                    size={24} 
                    color="black" />
                </Pressable>
              </HStack>
            </HStack>
            <ScrollView horizontal={true}>
              {markersList.map((marker) => {
                return <Card key={marker.id} markerObj={marker}></Card>;
              })}
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
    setShowModal(true)
    console.log(props.markerObj.id)
    console.log( e.target)
  };
  const now = new Date();

  return (
    <>
    <Pressable alignItems="center" ml="4" onPress={onCardPress} mb="5">
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
              //TODO: update to actual img uri
              source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
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
              <FontAwesome name="location-arrow" size={14} color="black" />
              <Text> 0.6 km </Text>
            </HStack>
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="sm" ml="-1">
              {props.markerObj.name}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "emerald.500",
              }}
              _dark={{
                color: "emerald.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {props.markerObj.username}
            </Text>
          </Stack>
          <HStack>
            {props.markerObj.categories.map((category, index) => {
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
              )
            })}
          </HStack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                {now - (props.markerObj.created_at / 1000) * 60 * 60 * 24} days
                ago
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Pressable>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} safeAreaTop={true} >
        <Modal.Content w="100%" h="100%"> 
          <Modal.CloseButton />
          <Modal.Header>Listing Info</Modal.Header>
          <Modal.Body>
          
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              borderRadius="5"
              //TODO: update to actual img uri
              source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
          <Heading>
           {props.markerObj.name}
          </Heading>
          <Text>Dsitance: 0.2 km away </Text>
          <Text>Last Updated: {props.markerObj.created_at}  </Text>
          </Modal.Body>
          <Modal.Footer justifyContent="space-between" h="20">
              <Pressable w="30%" h="90%" flexDirection="row" alignItems="center" bg="emerald.300" borderWidth="2" borderColor="emerald.500" borderRadius="5" pl="1">
                  <AntDesign name="tagso" size={24} color="text.900" />
                  <Text> Grab Item </Text>
              </Pressable>
              <Pressable w="30%" h="90%"  flexDirection="row" alignItems="center" bg="red.300" borderWidth="2" borderColor="red.400" borderRadius="5" pl="1">
                  <MaterialIcons name="block" size={22} color="black" />
                  <Text> Not There </Text>
              </Pressable>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
