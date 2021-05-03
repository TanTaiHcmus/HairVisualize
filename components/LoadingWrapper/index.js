import React from "react";
import { ActivityIndicator, View } from "react-native";
import Styles from "./style";

const LoadingWrapper = ({ children, isLoading, style }) => {
  return (
    <View style={style}>
      {isLoading && (
        <ActivityIndicator
          color="#0d518c"
          size="large"
          style={Styles.loading}
        />
      )}
      {children}
    </View>
  );
};

export default LoadingWrapper;
