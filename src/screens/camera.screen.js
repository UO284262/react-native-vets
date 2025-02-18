import { useContext } from "react";
import { View } from "react-native";
import { useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../services/authentication.context";
import { CameraContainer, CameraViewer } from "../theme/styles";

export const CameraScreen = ({ navigation }) => {
  const authenticationContext = useContext(AuthenticationContext);
  const [permission, requestPermission] = useCameraPermissions();
  let cameraRef;

  const takePicture = () => {
    cameraRef
      .takePictureAsync()
      .then((picture) => {
        AsyncStorage.setItem(
          `@picture-${authenticationContext.user.uid}`,
          picture.uri,
        );
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!permission) {
    requestPermission();
  } else if (permission.granted) {
    return (
      <CameraViewer
        ref={(ref) => {
          cameraRef = ref;
        }}
      >
        <CameraContainer onPressIn={takePicture} />
      </CameraViewer>
    );
  } else {
    return <View />;
  }
};
