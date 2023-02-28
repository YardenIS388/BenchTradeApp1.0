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
  } from "native-base";
  import { BlurView } from "expo-blur";
  import { useState, useEffect } from "react";
  import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
  
  const LocationCardsMenuSkeleton = () => {
    return (
      <Box position="absolute" bottom="0" bg="rgba(255,255,255,0.5)" w="100%">
        <BlurView intasity="20">
          <HStack justifyContent="space-between" p="3">
            <Heading>Around You</Heading>
            <HStack borderRadius="full">
              {/* <Pressable
                ml="2"
                mr="2"
                borderRadius="full"
                p="1"
                _pressed={{ bg: "white" }}
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
              >
                <MaterialIcons name="access-time" size={24} color="black" />
              </Pressable> */}
            </HStack>
          </HStack>
          <ScrollView horizontal={true}>
            <CardSkeleton></CardSkeleton>
            <CardSkeleton> </CardSkeleton>
            <CardSkeleton> </CardSkeleton>
            <CardSkeleton> </CardSkeleton>
            <CardSkeleton> </CardSkeleton>
          </ScrollView>
        </BlurView>
      </Box>
    )
  }
  
  export default LocationCardsMenuSkeleton;
  
  const CardSkeleton = () => {
    return <Center w="200" h="300" ml="3" mb="5" bg="white" rounded="md">
      <VStack w="100%" h="100%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
      borderColor: "coolGray.500"
    }} _light={{
      borderColor: "coolGray.200"
    }}>
        <Skeleton h="33%" />
       
        <Skeleton.Text px="4" />
      </VStack>
    </Center>
};
  
  