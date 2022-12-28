import {useState, useContext} from 'react'
import {SafeAreaView,Image} from 'react-native'
import {useToast,Center, Box, Heading, VStack, FormControl, Input, Link, HStack, Button, Text, AspectRatio } from 'native-base'
import {UserContext} from "../context/authentication.context"
import axios from 'axios';

export default function LoginScreen () {

    const {login} = useContext(UserContext)
    const [loginData,    setLoginData]    = useState({})
    
    
    const loginErrorToast = useToast()
    const loginUrl = "http://localhost:8082/auth/login"


    const loginHandler = (e) => {
           
        const loginRequest = axios.post(loginUrl, {email: loginData.email, password: loginData.password})
        const loginString = JSON.stringify(loginRequest)
            console.log({loginData})
            console.log(loginRequest)

            loginString ? login({name: loginData.email , token: loginString}) : loginErrorToast.show({ description: "Seems there was an error with your login information" }) 
    }

   
    return(
    <SafeAreaView >
    <Center w="100%" pt='50'>
    <Image source={require('../assets/images/loginImg.png')}/>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
      
        <Heading 
                    size="lg" 
                    fontWeight="600" 
                    color="coolGray.800" 
                    _dark={{
                    color: "warmGray.50"
          }}>
          Welcome
        </Heading>

        <Heading    mt="1" _dark={{
                    color: "warmGray.200"
                    }} 
                    color="coolGray.600" 
                    fontWeight="medium" 
                    size="xs">
          Sign in to continue!
        </Heading>


        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input 
                backgroundColor='muted.100' 
                height="50" 
                placeholder="Your email" 
                onChangeText= {value => setLoginData({ ...loginData, email: value })} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input 
                type='password'
                backgroundColor='muted.100' 
                height="50" 
                placeholder="Your password" 
                onChangeText= {value => setLoginData({ ...loginData, password: value })} />
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "emerald.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="emerald" onPress={loginHandler}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
                color: "emerald.500",
                fontWeight: "medium",
                fontSize: "sm"
                }} 
                href="#">
                Sign Up
            </Link>
          </HStack>
        </VStack>


      </Box>
    </Center>
    </SafeAreaView>
    )
}

