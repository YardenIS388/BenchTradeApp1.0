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
  HStack
} from "native-base";
import { UserContext } from "../context/authentication.context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";

export default function RegisterScreen() {
  const { login } = useContext(UserContext);
  const [loginData, setLoginData] = useState({});

  const loginErrorToast = useToast();
  const loginUrl = "http://localhost:8082/auth/login";

  function containsWhitespace(str) {
    return /\s/g.test(str);
  }
  function validateEmail(str){
   return   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
  }

  const registerHandler = (e) => {
   

    if (containsWhitespace(loginData.name) ){
        loginErrorToast.show({
            description: "Name is excpected to be two words with a space between ",
          })
          return
    }
    if(validateEmail(loginData.email)){
        loginErrorToast.show({
            description: "Please make sure you provide us with a legitemate email address ",
          })
          return
    }
    if( loginData.password !== loginData.confirmPassword){
        loginErrorToast.show({
            description: "Passwords do not match",
          })
          return
    }
    // simple validations passed and there is a point to try oerfirm the request 

    const loginRequest = axios.post(loginUrl, {
        email: loginData.email,
        password: loginData.password,
     //   TODO: add missing fields for register action and figure out the correct root. 
      });
      const loginString = JSON.stringify(loginRequest);
      console.log({ loginData });
      console.log(loginRequest);

    loginString
      ? login({ name: loginData.email, token: loginString })
      : loginErrorToast.show({
          description: "Oops, looks like something whent wrong.",
        });
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {/* if you want to wrap more than one chikd inside Touchabkeiwthoutfeedback it has to be a View */}
        <View>
          <Center w="100%" pt="30">
            <Image source={require("../assets/images/loginImg.png")} />
            <Box safeArea p="2" py="3" w="90%" maxW="290">
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

              <VStack space={3} mt="5">
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
              </VStack>
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
