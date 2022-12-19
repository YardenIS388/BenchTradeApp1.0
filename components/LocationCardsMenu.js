import { Actionsheet, Box, Text, Center, useDisclose , Button, ScrollView, AspectRatio, HStack, Stack, Heading,  Image , Badge} from "native-base";
import { FontAwesome } from '@expo/vector-icons';

const LocationCardsMenu = (props) => {
    
    const {
        isOpen,
        onOpen,
        onClose
      } = useDisclose();
      return <Center>
          <Button onPress={onOpen}>Actionsheet</Button>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
            <Box>
                <ScrollView horizontal={true}>                
                     {props.markers.map((marker)=> {
                            return (
                             <Card mr='10'></Card>
                            )
                     })}
                </ScrollView>
            </Box>
            </Actionsheet.Content>
          </Actionsheet>
        </Center>;
}

export default LocationCardsMenu


const Card = () => {
    return (
      <Box alignItems="center">
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                }}
                alt="image"
              />
            </AspectRatio>
            <Center 
              bg="emerald.500"
              _dark={{
                bg: "emerald.400",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
            <HStack>
            <FontAwesome name="location-arrow" size={24} color="black" />
              <Text> 0.6 km </Text> 
            </HStack>
               
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                The Garden City
              </Heading>
              <Text
                fontSize="xs"
                _light={{
                  color: "emerald.500",
                }}
                _dark={{
                  color: "emerald.400",
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                The Silicon Valley of India.
              </Text>
            </Stack>
            <HStack>
             <Badge m='1' p='1.5' variant='outline' colorScheme='emerald'>Toys</Badge>
             <Badge m='1' p='1.5' variant='outline' colorScheme='emerald'>Clothes</Badge>
             <Badge m='1' p='1.5' variant='outline' colorScheme='emerald'>Electronics</Badge>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  6 mins ago
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    );
  }