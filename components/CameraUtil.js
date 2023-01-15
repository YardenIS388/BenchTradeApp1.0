import { Camera, CameraType, Constants, Button } from "expo-camera";
import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import { TouchableOpacity, ImageBackground } from "react-native";
import { Text, View, AspectRatio, Pressable,HStack, Spinner } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { CameraContext } from "../context/authentication.context";
import axios from "axios";

export default function CameraUtil(props) {
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setCameraPermission] =
    Camera.useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cloudImage, setCloudImage] = useState(null);
  const [cameraReady, setIsCameraReady] = useState(false);

  if (!hasCameraPermission) {
    return <View />;
  }
  if (!hasCameraPermission.granted) {
    return <Text>No access to camera</Text>;
  }

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    const options = { quality: 0.1, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);
    setPreviewVisible(true);
    setCloudImage({ localUri: data.uri });
    setCapturedImage(data);
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function discardPreview() {
    setCapturedImage(null);
    setPreviewVisible(false);
  }

  function closeCamera() {
    props.closeCamera();
  }

  function makePreviewUnvisible() {
    setPreviewVisible(false);
    closeCamera();
  }

  return capturedImage && previewVisible ? (
    <CameraPreview
      photo={capturedImage}
      handleDiscard={discardPreview}
      makePreviewUnvisible={makePreviewUnvisible}
    ></CameraPreview>
  ) : (
    <View position="absolute" flex="1" h="100%" w="100%">
      <Camera
        type={type}
        ref={cameraRef}
        height="100%"
        onCameraReady={onCameraReady}
      >
        <View justifyContent="space-between" h="100%">
          <View
            flexDirection="row"
            w="100%"
            mt="50"
            justifyContent="space-between"
            px="5"
          >
            <TouchableOpacity onPress={toggleCameraType}>
              <Text>Flip Camera</Text>
            </TouchableOpacity>
            <Pressable onPress={props.closeCamera}>
              <Ionicons name="ios-close" size={44} color="white" />
            </Pressable>
          </View>
          <Pressable
            borderWidth="5"
            mb="20"
            borderColor="white"
            borderRadius="full"
            w="70"
            h="70"
            alignSelf="center"
            justifyContent="center"
            alignItems="center"
            onPress={takePicture}
            _pressed={{
              bg: "rgba(255,255,255,0.5)",
            }}
          >
            <Ionicons name="ios-camera-outline" size={34} color="white" />
          </Pressable>
        </View>
      </Camera>
    </View>
  );
}

const CameraPreview = ({ photo, handleDiscard, makePreviewUnvisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setNewPhoto } = useContext(CameraContext);

  async function usePhoto() {
    setIsLoading(true)
    const cloud_img = await cloudinaryUpload(photo);
    setNewPhoto(cloud_img)
    setIsLoading(false)
    makePreviewUnvisible()
    
  }

  return isLoading ? (
    <View height="100%" bg="rgba(240, 240, 240,0.7)" width="100%" borderWidth="1" position="absolute">
      <HStack space={8} width="100%" height="100%" justifyContent="center" alignItems="center">
        <Spinner size="lg" color="emerald.500" />
      </HStack>
    </View>
  ) : (
    <View height="100%" width="100%" borderWidth="1" position="absolute">
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      />
      <View
        bg="black"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        p="8"
      >
        <Pressable
          borderRadius="10"
          w="40"
          h="10"
          borderColor="white"
          borderWidth="2"
          justifyContent="center"
          alignItems="center"
          onPress={handleDiscard}
        >
          <Text color="white">Discard</Text>
        </Pressable>
        <Pressable
          bg="emerald.500"
          borderRadius="10"
          w="40"
          h="10"
          borderColor="white"
          borderWidth="2"
          justifyContent="center"
          alignItems="center"
          onPress={usePhoto}
        >
          <Text color="white">Use Photo</Text>
        </Pressable>
      </View>
    </View>
  );
};

let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dv2klfl7h/upload";

const cloudinaryUpload = async (photo) => {
  const base64Img = `data:image/jpg;base64,${photo.base64}`;
  const data = {
    file: base64Img,
    upload_preset: "trade_bench_app",
  };
  try {
    const result = await axios.post(CLOUDINARY_URL, data);
    return result.data.secure_url;
  } catch (err) {
    console.log(err);
  }
};
