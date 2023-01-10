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
} from "native-base";
import { ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CameraUtil from "../components/CameraUtil";
import { CameraContext } from "../context/authentication.context";

export default function NewListingScreen({ navigation }) {
  const { photo } = useContext(CameraContext);
  const {clearPhoto} = useContext(CameraContext)
  const [image, setImage] = useState(null);
  const [imgCloudUrl, setImgCloudUrl] = useState(photo);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [camera, setCamera] = useState(false);
  const [cameraImage, setCameraImage] = useState(photo);

  useEffect(() => {
    setImgCloudUrl(photo);
},[])



  const numbers = [];
  for (let i = 0; i < 100; i++) {
    numbers.push(i);
  }

  const validate = () => {

    // if (formData.name === undefined) {
    //   setErrors({ ...errors,
    //     name: 'Name is required'
    //   });
    //   return false;
    // } else if (formData.name.length < 3) {
    //   setErrors({ ...errors,
    //     name: 'Name is too short'
    //   });
    //   return false;
    // }

    return true;
  };

  const onSubmit = () => {
    //TODO: Complete form data validation and pass form Data to server
    validate() ? console.log("Submitted") : console.log("Validation Failed");


    clearPhoto()
    navigation.navigate("MapScreen");
  };

  const openCamera = () => {
    console.log("click");
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
      console.log("everything is alright");
      setImage(result.assets[0].uri);
    }
  };

  console.log(imgCloudUrl);
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
          <FormControl isRequired isInvalid={"listing-title" in errors}>
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
          </FormControl>

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
            { !imgCloudUrl.photo ?
              <AntDesign
                name="camerao"
                size={25}
                color="grey"
                style={{position:"absolute"}}
              />
              :
              null
            }
              <View borderRadius="4" w="100%" h="100%">
              {imgCloudUrl.photo ?
                <ImageBackground
                  key={imgCloudUrl}
                  resizeMode="cover"
                  borderRadius="4"
                  style={{flex:1}}
                  source={{uri:imgCloudUrl.photo}}
                  alt="watermelon"
                ></ImageBackground>
                :
                <View w="0" h="0"></View>
              }
              </View>
            </Pressable>
          </FormControl>

          <Button onPress={onSubmit} height="50" mt="5" colorScheme="green">
            Submit
          </Button>
        </VStack>
      </Center>
      {camera ? <CameraUtil closeCamera={closeCamera}></CameraUtil> : <></>}
    </ImageBackground>
  );
}
