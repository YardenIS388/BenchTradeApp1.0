import {useState} from 'react'
import {SafeAreaView, TextInput,StyleSheet,Image, Pressable,View} from 'react-native'
import {Center, Box, Heading, VStack, FormControl, Input, Link, HStack, Button, Text, AspectRatio } from 'native-base'


export default function LoginScreen ({navigation}) {
 
    const [loginData,    setLoginData]    = useState({})


    const loginHandler = (e) => {
        if(loginData){
            //TODO: this will be the part where I check if the password and email match the database
            console.log({loginData})
            navigation.navigate('MapScreen')
        }
        else{
            setLoginData(null)
        }
    }
    console.log({...loginData})
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

