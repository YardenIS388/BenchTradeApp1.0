import { View, Pressable } from "native-base";
import { Link } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";


const MenuComponent = () => {
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
      <Pressable
        onPress={() => console.log("click")}
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

      <View alignItems="center"
            bg="white"
            borderRadius="full"
            shadow="3"
            p="3"
            m="1">
            
          <Link to={{ screen: "NewListing" }}>
             <MaterialIcons name="post-add" size={24} color="black" />
          </Link>
      </View>
    </View>
  )
}

export default MenuComponent;
