import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabsNavigation from "./src/navigation/BottomTabsNavigation";

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <NavigationContainer>
        <BottomTabsNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
