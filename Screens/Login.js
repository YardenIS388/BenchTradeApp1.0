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
  HStack,
  Button,
  Text,
  Spinner
} from "native-base";
import { Link } from "@react-navigation/native";
import { UserContext } from "../context/authentication.context";
import axios from "axios";

{
  /* <script src="http://30.30.2.218:8097"></script> */
}

export default function LoginScreen() {
  const { login } = useContext(UserContext);
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false)

  const loginErrorToast = useToast();
  const loginUrl = "https://trade-bench-server.onrender.com/auth/login";
 

  const loginHandler = async (e) => {
    setLoading(true)
    try {
      const loginRequest = await axios({
        method: 'POST',
        url: loginUrl,
        withCredentials: true,
        data: { email: loginData.email, password: loginData.password },
      });
  
      // check if request returned a successful status code
      if (loginRequest.status === 200 && loginRequest.data) {
        // convert response to string and pass it to login function
        const loginString = JSON.stringify(loginRequest.data);
        //console.log({loginString:loginString})
        login({ name: loginData.email, token: loginString });
      } else {
        loginErrorToast.show({
          description: "Seems there was an error with your login information",
        });
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log(error.response.data);
        //console.log("is it this one"+ error.response.status);
        //console.log(error.response.headers);
        //console.log(error.response.message)
        setLoading(false)
        loginErrorToast.show({
          description: error.response.message ? error.response.data.message : "Uh oh! there was an error with your login information",
        });

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
              <Image style={{width: '100%' ,resizeMode:'contain', marginBottom:80}} source={require("../assets/images/TradeBenchLogin.png")} />
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Welcome
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
                Sign in to continue!
              </Heading>

              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Email ID</FormControl.Label>
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
                  <Link
                    to={{ screen: "" }}
                    style={{ color: "green", margin: 3 }}
                  >
                    Forget Password?
                  </Link>
                </FormControl>
                <Button mt="10" h="50" colorScheme="emerald" onPress={loginHandler}>
                  
                  {loading ?  
                  <HStack justifyContent="space-around" width="100"> 
                      <Spinner accessibilityLabel="Loading posts" color="white"/>
                      <Heading color="white" fontSize="sm">Loading </Heading> 
                  </HStack>: 
                  "Sign in"}
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    I'm a new user.{" "}
                  </Text>
                  <Link
                    to={{ screen: "RegisterScreen" }}
                    style={{ color: "green" }}
                  >
                    Sign Up
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
