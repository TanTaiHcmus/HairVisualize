import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";

const requestLibraryPermission = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Sorry, we need media library permissions to make this work!"
      );
      return false;
    }
    return true;
  }
};

export const openGallery = async (aspect) => {
  const hasPermission = await requestLibraryPermission();

  if (hasPermission) {
    let result = await ImagePicker.launchImageLibraryAsync({
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
