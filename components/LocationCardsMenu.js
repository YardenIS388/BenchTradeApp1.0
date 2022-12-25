import {
  View,
  Actionsheet,
  Box,
  Text,
  Center,
  useDisclose,
  Button,
  ScrollView,
  AspectRatio,
  HStack,
  Stack,
  Heading,
  Pressable,
  Image,
  Badge,
} from "native-base";
import { useState, useEffect } from "react";
import { FontAwesome, MaterialIcons} from "@expo/vector-icons";
import sortedMarkers from "../sortedLocations.json"
import notSortedMarkers from "../fakeLocations.json"

const LocationCardsMenu = (props) => {

  const { isOpen, onOpen, onClose } = useDisclose();
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
    <Center>
      <Button onPress={onOpen}>Actionsheet</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box>
            <HStack
              justifyContent="space-between"
              pl="1"
              pr="5"
              pb="5"
              alignItems="flex-end"
              mb="2"
              mt="2"
            >
              <Heading>Around You</Heading>
              <HStack borderRadius="full">
                <Pressable ml="2" mr='2' borderRadius="full" p="1"
                            _pressed={{bg:'light.200'}}
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
                           _pressed={{bg:'light.200'}}
                           _focus={{bg:'light.200'}}
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
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default LocationCardsMenu;

const Card = (props) => {
  const onCardPress = () => {
    console.log(props.markerObj.id);
  };
  const now = new Date();

  return (
    <Pressable alignItems="center" m="1" onPress={onCardPress}>
      <Box
        maxW="80"
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
            <HStack>
              <FontAwesome name="location-arrow" size={24} color="black" />
              <Text> 0.6 km </Text>
            </HStack>
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
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
                  h="10"
                  key={index}
                  m="1"
                  pl="15"
                  pr="15"
                  variant="outline"
                  colorScheme="emerald"
                >
                  {" "}
                  {category}{" "}
                </Badge>
              );
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
  );
};
