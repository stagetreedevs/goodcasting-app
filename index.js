/**
 * @format
 */
import 'react-native-gesture-handler';
import React from "react";
import { NativeBaseProvider } from "native-base";
import { AppRegistry } from "react-native";
import App from "./App";
import { NotificationProvider } from "./src/contexts/notification";
import { name as appName } from "./app.json";

const AppWrapper = () => {
  return (
    <NotificationProvider>
      <NativeBaseProvider>
        <App />
      </NativeBaseProvider>
    </NotificationProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWrapper);
