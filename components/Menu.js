import { useState, useContext } from "react";
import {
  View,
  Pressable,
  Modal,
  Button,
  Avatar,
  Text,
  HStack,
} from "native-base";
import { Link } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {UserContext} from "../context/authentication.context"

const MenuComponent = () => {

  const {logout} = useContext(UserContext)
  const {user} = useContext(UserContext)
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      position="absolute"
      top="6%"
      left="4%"
      flexDirection="row"
      alignContent="center"
      justifyContent="space-between"
      w="100"
    >
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <Modal.Content
          bg="light.100"
          shadow="9"
          pt="20"
          style={{
            marginLeft: 0,
            marginTop: 0,
            marginRight: "auto",
            marginBottom: "auto",
            height: "100%",
            maxHeight:"100%",
            rounded:"0"
          }}
        >
          <Modal.Body>
            <HStack
              alignItems="center"
              w="100%"
              borderBottomWidth="1"
              paddingBottom="5"
              h="100%"
            >
              <Avatar borderWidth={3} borderColor="white"
                source={{uri:"https://source.unsplash.com/random/250×250/?fruit"}}
                marginRight={14}
                size={16}
              ></Avatar>
              <Text fontSize={18}> {user.name}</Text>
            </HStack>
          </Modal.Body>
          <Modal.Footer justifyContent="flex-start" p="0">
            <Pressable
              w="100%"
              h="100%"
              py="5"
              pb="10"
              px="5"
              justifyContent="space-between"
              onPress={()=> {
                logout()
              }}
              _pressed={{
                bg: "light.200",
              }}
            >
              <View flexDirection="row">
                <MaterialIcons name="logout" size={24} color="black" />
                <Text fontSize="16"> Logout</Text>
              </View>
            </Pressable>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Pressable
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        _pressed={{
          shadow: "6",
          bg: "light.200",
        }}
        alignItems="center"
        bg="white"
        borderRadius="full"
        shadow="3"
        p="3"
        m="1"
      >
        <MaterialIcons name="menu-open" size={24} color="black" />
      </Pressable>
      <View
        alignItems="center"
        bg="white"
        borderRadius="full"
        shadow="3"
        p="3"
        m="1"
      >
        <Link to={{ screen: "NewListing" }}>
          <MaterialIcons name="post-add" size={24} color="black" />
        </Link>
      </View>
    </View>
  );
};

export default MenuComponent;
