import { View, Pressable } from "native-base";
import { Link } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";


const MenuComponent = () => {
  return (
    <View
      position="absolute"
      top="5%"
      left="0"
      flexDirection="row"
      alignContent="center"
      m="3"
      justifyContent="space-between"
      borderWidth="1"
    >
      <Pressable
        onPress={() => console.log("click")}
        _pressed={{
          shadow: "6",
          bg: "light.200",
        }}
        alignItems="center"
        bg="white"
        borderRadius="full"
        p="3"
        shadow="3"
       
      >
        <MaterialIcons name="menu-open" size={24} color="black" />
      </Pressable>
      <Link to={{ screen: "NewListing" }}>
        <View
          bg="white"
          borderRadius="full"
          p="3"
          shadow="3"
        >
          <MaterialIcons name="post-add" size={24} color="black" />
        </View>
      </Link>
    </View>
  )
}

export default MenuComponent;
