import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {ImageBackground} from 'react-native'
import {Text,Heading , VStack,FormControl,Input,Button,Center,Select,CheckIcon, WarningOutlineIcon, NumberInputStepper, Pressable} from 'native-base'
import { AntDesign } from '@expo/vector-icons';

export default function NewListingScreen({navigation}) {

    
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('')
  const [formData, setFormData] = useState({});
  const [errors, setErrors]     = useState({});
 
  
  
  const numbers = []
  for(let i =0; i<100; i++ ){
        numbers.push(i)
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
    validate() ? console.log('Submitted') : console.log('Validation Failed');
  
    navigation.navigate('MapScreen')
   
   
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.lof(result)
      setImage(result.assets[0].uri);
    }
  };


  return (
  <Center mt='100'>
    <VStack width="90%" mx="3" maxW="300px">
      <Heading mb='50'>Let's Create a New Listing!</Heading>
      <FormControl isRequired isInvalid={'listing-title' in errors}>
        <FormControl.Label _text={{
        bold: true
      }}>Listing Title</FormControl.Label>
        <Input backgroundColor='muted.100' height="50" placeholder="Listing Title" onChangeText={value => setFormData({ ...formData,
        title: value
      })} />
        
      </FormControl>

      <FormControl maxW="300">
        <FormControl.Label>Choose Category</FormControl.Label>
        <Select 
          backgroundColor='muted.100' 
          height="50" 
          accessibilityLabel="Choose Category" 
          placeholder="Choose Category" 
          onValueChange={value => setFormData({ ...formData, categoty: value})}
          _selectedItem={{
          bg: "teal.200",
        endIcon: <CheckIcon size={5} />
      }} mt="1">
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
          backgroundColor='muted.100' 
          height="50" 
          accessibilityLabel="How many items?" 
          placeholder="How many items?" 
          onValueChange={value => setFormData({ ...formData, amount: value})}
          _selectedItem={{
          bg: "teal.200",
        endIcon: <CheckIcon size={5} />
      }} mt="1">
      
      { numbers.map((number, index) => {
        return (
          <Select.Item key={index} label={String(index)} value={String(index)}/>
        )
      })} 
        </Select>
      </FormControl>

      <FormControl maxW="300">
        <FormControl.Label>Upload Image</FormControl.Label>
        <ImageBackground source={image} resizeMode="cover" >
          <Pressable borderWidth={1}
                     borderStyle='dashed'
                     borderRadius='4'
                     backgroundColor='muted.100'
                     borderColor='muted.300' 
                     height='150' 
                     justifyContent='center' 
                     alignItems='center'
                     onPress={pickImage}>
               <AntDesign name="camerao" size={25} color="grey" />
               <Text>{errors.image}</Text>
          </Pressable>
        </ImageBackground>
        </FormControl>

      <Button onPress={onSubmit} height='50' mt="20" colorScheme="green">
        Submit
      </Button>
    </VStack>
  </Center>
  );
}
