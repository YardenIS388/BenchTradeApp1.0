import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Select,
  CheckIcon,
  Pressable,
  useToast,
  Spinner,
  HStack
} from "native-base";
import { ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CameraUtil from "../components/CameraUtil";
import {
  CameraContext,
  LocationContext,
} from "../context/authentication.context";
import axios from "axios";
export default function NewListingScreen({ navigation }) {
  const { location } = useContext(LocationContext);
  const { photo } = useContext(CameraContext);
  const { clearPhoto } = useContext(CameraContext);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [camera, setCamera] = useState(false);
  const newListingToast = useToast();
  const createListingrUrl = "https://trade-bench-server.onrender.com/listings";
  const [loading, setLoading] = useState(false);

  const numbers = [];
  for (let i = 0; i < 100; i++) {
    numbers.push(i);
  }

  const validate = () => {
    //  if(!photo.photo){
    //   newListingToast.show({
    //     title: "You have to take a picture of your listing so others can see it",
    //     variant: "subtle",
    //     description: "Please take the time to snap a picture of your listing"
    //   })
    //   return false
    //  }
    // if(!formData.category){
    //   newListingToast.show({
    //     title: "please choose at least one category ",
    //     variant: "subtle",
    //     description: "Every listing needs at least one category"
    //   })
    //   return false;
    // }
    // if(!formData.amount){
    //   newListingToast.show({
    //     title: "Must have at least one item  ",
    //     variant: "subtle",
    //     description: "Every listing needs at least one item in it"
    //   })
    //   return false;
    // }
    return true;
  };

  const onSubmit = () => {
    //TODO: Complete form data validation and pass form Data to server
    if (validate()) {
      createListingRequest(formData);
    }
  };

  const openCamera = () => {
    //console.log("click");
    setCamera(true);
  };

  const closeCamera = () => {
    setCamera(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("THE URI IS:" + result.assets[0].uri);
    if (!result.canceled) {
      //console.log("everything is alright");
      setImage(result.assets[0].uri);
    }
  };

  const createListingRequest = async (formData) => {
    setLoading(true)
    const listingRequest = await axios({
      method: "POST",
      url: createListingrUrl,
      withCredentials: true,
      data: {
        location: {
          type: "Point",
          coordinates: [
            location.location.coords.longitude,
            location.location.coords.latitude,
          ],
        },
        number_of_items: formData.amount,
        tags: [formData.category],
        images: [photo.photo],
      },
    })
      .then((response) => {
        if (response.status == 201) {
          clearPhoto();
          setLoading(false)
          navigation.navigate("MapScreen")
          newListingToast.show({
            title: "Sucssess",
            variant: "subtle",
            placement: "top",
            description: "Your new listing in now visible for everyone to see",
          })
        }
        else {
          setLoading(false)
          newListingToast.show({
            title: "Somehing Went Wrong",
            variant: "subtle",
            placement: "top",
            description: "Sorry, ww could not process that request",
          })
        }
      })
      .catch((error) => {
        console.log("error in then" + error);
        newListingToast.show({
          title: "Failure",
          variant: "subtle",
          placement: "top",
          description: "Sorry, something went wrong",
        });
      });
  };

  return (
    <ImageBackground
      source={require("../assets/images/AddListingBackDrop.png")}
      alt="bg"
      w="100%"
      h="100%"
    >
      <Center h="100%">
        <VStack width="90%" mx="3" maxW="300px">
          <Heading mb="50">Let's Create a New Listing!</Heading>
          {/* <FormControl isRequired isInvalid={"listing-title" in errors}>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Listing Title
            </FormControl.Label>
            <Input
              backgroundColor="muted.100"
              height="50"
              placeholder="Listing Title"
              onChangeText={(value) =>
                setFormData({ ...formData, title: value })
              }
            />
          </FormControl> */}

          <FormControl maxW="300">
            <FormControl.Label>Choose Category</FormControl.Label>
            <Select
              backgroundColor="muted.100"
              height="50"
              accessibilityLabel="Choose Category"
              placeholder="Choose Category"
              onValueChange={(value) =>
                setFormData({ ...formData, categoty: value })
              }
              _selectedItem={{
                bg: "teal.200",
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
            >
              <Select.Item label="Toys" value="toys" />
              <Select.Item label="Clothes" value="clothes" />
              <Select.Item label="Books" value="books" />
              <Select.Item label="Electronics" value="electronics" />
              <Select.Item label="Furniture" value="furniture" />
            </Select>
          </FormControl>

          <FormControl maxW="300">
            <FormControl.Label>How Many Items?</FormControl.Label>
            <Select
              backgroundColor="muted.100"
              height="50"
              accessibilityLabel="How many items?"
              placeholder="How many items?"
              onValueChange={(value) =>
                setFormData({ ...formData, amount: value })
              }
              _selectedItem={{
                bg: "teal.200",
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
            >
              {numbers.map((number, index) => {
                return (
                  <Select.Item
                    key={index}
                    label={String(index)}
                    value={String(index)}
                  />
                );
              })}
            </Select>
          </FormControl>

          <FormControl maxW="300">
            <FormControl.Label>Upload Image</FormControl.Label>

            <Pressable
              borderWidth={1}
              borderStyle="dashed"
              borderRadius="4"
              borderColor="muted.300"
              height="250"
              justifyContent="center"
              alignItems="center"
              onPress={openCamera}
            >
              {!photo.photo ? (
                <AntDesign
                  name="camerao"
                  size={25}
                  color="grey"
                  style={{ position: "absolute" }}
                />
              ) : null}
              <View borderRadius="4" w="100%" h="100%">
                {photo.photo ? (
                  <ImageBackground
                    key={photo.photo}
                    resizeMode="cover"
                    borderRadius="4"
                    style={{ flex: 1 }}
                    source={{ uri: photo.photo }}
                    alt="watermelon"
                  ></ImageBackground>
                ) : (
                  <View w="0" h="0"></View>
                )}
              </View>
            </Pressable>
          </FormControl>

          <Button onPress={onSubmit} h="50" mt="5" colorScheme="emerald">
          {loading ?  
                  <HStack justifyContent="space-around" width="100"> 
                      <Spinner accessibilityLabel="Loading posts" color="white"/>
                      <Text color="white" fontSize="sm">Loading </Text> 
                  </HStack>: 
                  "Submit"}
          </Button>
        </VStack>
      </Center>
      {camera ? <CameraUtil closeCamera={closeCamera}></CameraUtil> : <></>}
    </ImageBackground>
  );
}
