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
  Spinner,
  Input,
  Button,
  Pressable,
  HStack,
  ScrollView,
  Text
} from "native-base";
import { UserContext } from "../context/authentication.context";
import axios from "axios";

export default function RegisterScreen({navigation}) {

  const { login } = useContext(UserContext);
  const [registerData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false)

  const loginErrorToast = useToast();
  const registerUrl = "https://trade-bench-server.onrender.com/users";

  function containsWhitespace(str) {
    return /\s/g.test(str);
  }
  function validateEmail(str) {
    //return   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
    return true;
  }

  const registerHandler = (e) => {
    //console.log("register handler");
    setLoading(true)
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
    //setLoading(false)
  };

  const createUserRequest = async (registerData) => {
    // console.log("1. create user")

    try {
      const registerRequest = await axios({
        method: 'POST',
        url: registerUrl,
        withCredentials: true,
        data: { fullName: registerData.fullName, email: registerData.email, password: registerData.password },
      });
       
      // check if request returned a successful status code
      if (registerRequest.data) {
        // convert response to string and pass it to login function
        const registerString = JSON.stringify(registerRequest.data);
        //console.log({registerDataL:registerData.email})
        //TODO: make sure this authenticates the stack and moves user to home screen 
        loginErrorToast.show({description:"Great! user created sucssefully "})
        //navigation.navigate('Login')
        login({ name: registerData.email, token: registerString });
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
          <Center w="100%" alignItems="center">
            <Box safeArea w="80%" h="100%">
              <Image style={{width: '100%' ,resizeMode:'contain', marginBottom:100}} source={require("../assets/images/TradeBenchLogin.png")} />
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
                      setLoginData({ ...registerData, fullName: value })
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
                      setLoginData({ ...registerData, email: value })
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
                      setLoginData({ ...registerData, password: value })
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
                      setLoginData({ ...registerData, confirmPassword: value })
                    }
                  />
                </FormControl>

                <Button mt="10" h="50" colorScheme="emerald" onPress={registerHandler}>
                  
                  {loading ?  
                  <HStack justifyContent="space-around" width="100"> 
                      <Spinner accessibilityLabel="Loading posts" color="white"/>
                      <Text color="white" fontSize="sm">Loading </Text> 
                  </HStack>: 
                  "Sign Up Now"}
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
