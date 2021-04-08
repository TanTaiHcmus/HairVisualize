import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppScreen from "./screens/AppScreen";

export default function App() {
  return (
    <Provider store={store}>
      <AppScreen />
    </Provider>
  );
}
