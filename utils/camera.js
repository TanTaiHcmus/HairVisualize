import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";

const requestCameraPermission = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to make this work!");
      return false;
    }
    return true;
  }
};

export const openCamera = async (aspect) => {
  const hasPermission = await requestCameraPermission();

  if (hasPermission) {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect,
      quality: 1,
    });

    if (!result.cancelled) {
      return result.uri;
    }
    return null;
  }
};
