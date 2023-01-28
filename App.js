import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./routes/authStack";
import {
  UserProvider,
  CameraProvider,
  LocationProvider,
  RenderProvider,
} from "./context/authentication.context";

export default function App() {
  return (
    <UserProvider>
      <CameraProvider>
        <LocationProvider>
          <RenderProvider>
            <NativeBaseProvider>
              <NavigationContainer>
                <AuthStack></AuthStack>
              </NavigationContainer>
            </NativeBaseProvider>
          </RenderProvider>
        </LocationProvider>
      </CameraProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
