import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CoinsStack from "./src/components/coins/CoinsStack";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <CoinsStack />
        {/* <View style={styles.container}>
        <Text>Hello world!</Text>
      </View> */}
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
