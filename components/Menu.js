import {
  View,
  Pressable,
  Box,
  Divider,
  Menu,
  Center,
  Button,
  PresenceTransition,
  Text
} from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";

const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        alignItems="center"
        position="absolute"
        top="5%"
        left="5%"
        bg="white"
        borderRadius="full"
        p="3"
        shadow="3"
      >
        <SimpleLineIcons name="menu" size={22} color="black" />
      </Pressable>
      <Center>
        <PresenceTransition
          visible={isOpen}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 250,
            },
          }}
        >
          <Center
            flex="1"
            bottom="10%"
            right="10%"
            position="absolute"
            bg="teal.500"
            rounded="md"
            w="250"
            h="500"
            _text={{
              color: "white",
            }}
          >
            <Box>
                <Text> User</Text>
                <Text> Logout</Text>
                 
            </Box>
          </Center>
        </PresenceTransition>
      </Center>
    </>
  );
};

export default MenuComponent;
