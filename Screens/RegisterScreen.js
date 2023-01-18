import { useState, useContext } from "react";
import {
  SafeAreaView,
  Image,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  useToast,
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Pressable,
  HStack,
  ScrollView,
} from "native-base";
import { UserContext } from "../context/authentication.context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

export default function RegisterScreen() {

  const { login } = useContext(UserContext);
  const [registerData, setLoginData] = useState({});

  const loginErrorToast = useToast();
  const registerUrl = "http://30.30.2.218:8081/users";

  function containsWhitespace(str) {
    return /\s/g.test(str);
  }
  function validateEmail(str) {
    //return   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
    return true;
  }

  const registerHandler = (e) => {
    console.log("register handler");
    if (containsWhitespace(registerData.name)) {
      loginErrorToast.show({
        description: "Name is excpected to be two words with a space between ",
      });
      return;
    }
    if (!validateEmail(registerData.email)) {
      loginErrorToast.show({
        description:
          "Please make sure you provide us with a legitemate email address ",
      });
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      loginErrorToast.show({
        description: "Passwords do not match",
      });
      return;
    }
    // simple validations passed and there is a point to try oerfirm the request

    createUserRequest(registerData);
    //createUserRequest(loginData)
    //   try{
    //   const register = axios.post("http://localhost:8082/users" , {
    //       email:loginData.email,
    //       fullName: loginData. fullName,
    //       password: loginData.password
    //   })

    //   console.log(register)
    // }
    // catch(e) {
    //   console.log(e)
    // }

    // const loginRequest = axios.post(loginUrl, {
    //     email: loginData.email,
    //     password: loginData.password,
    //  //   TODO: add missing fields for register action and figure out the correct root.
    //   });
    //   const loginString = JSON.stringify(loginRequest);
    //   console.log({ loginData });
    //   console.log(loginRequest);

    // loginString
    //   ? login({ name: loginData.email, token: loginString })
    //   : loginErrorToast.show({
    //       description: "Oops, looks like something whent wrong.",
    //     });
  };

  const createUserRequest = async (loginData) => {
    // console.log("1. create user")

    try {
      const registerRequest = await axios({
        method: 'POST',
        url: registerUrl,
        withCredentials: true,
        data: { email: loginData.email, password: loginData.password },
      });
  
      // check if request returned a successful status code
      if (registerRequest.status === 200 && registerRequest.data) {
        // convert response to string and pass it to login function
        const registerString = JSON.stringify(loginRequest.data);
        login({ name: loginData.email, token: registerString });
      } else {
        loginErrorToast.show({
          description: "Seems there was an error with your registration info",
        });
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }


  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {/* if you want to wrap more than one chikd inside Touchabkeiwthoutfeedback it has to be a View */}
        <View>
          <Center w="100%" pt="5">
            <Image source={require("../assets/images/loginImg.png")} />
            <Box safeArea p="2" py="1" w="90%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Happy to See you here
              </Heading>

              <Heading
                mt="1"
                _dark={{
                  color: "warmGray.200",
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
              >
                Let's get you registred!
              </Heading>

              <ScrollView
                h="80%"
                mt="5"
                automaticallyAdjustKeyboardInsets={true}
              >
                <FormControl>
                  <FormControl.Label>Full Name</FormControl.Label>
                  <Input
                    backgroundColor="muted.100"
                    height="50"
                    placeholder="Your name"
                    onChangeText={(value) =>
                      setLoginData({ ...loginData, fullName: value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    backgroundColor="muted.100"
                    height="50"
                    placeholder="Your email"
                    onChangeText={(value) =>
                      setLoginData({ ...loginData, email: value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    type="password"
                    backgroundColor="muted.100"
                    height="50"
                    placeholder="Your password"
                    onChangeText={(value) =>
                      setLoginData({ ...loginData, password: value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormControl.Label>Comfirm Password</FormControl.Label>
                  <Input
                    type="password"
                    backgroundColor="muted.100"
                    height="50"
                    placeholder="Your password"
                    onChangeText={(value) =>
                      setLoginData({ ...loginData, confirmPassword: value })
                    }
                  />
                </FormControl>

                <Button mt="2" colorScheme="emerald" onPress={registerHandler}>
                  Sign up
                </Button>
              </ScrollView>

              {/* <HStack>
                <Pressable>
                        <MaterialCommunityIcons name="google" size={24} color="black" />
                </Pressable>
                <Pressable>
                    <MaterialCommunityIcons name="facebook" size={25} color="black" />
                </Pressable>
              </HStack> */}
            </Box>
          </Center>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
