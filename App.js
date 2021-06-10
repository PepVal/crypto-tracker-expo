import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import CoinsStack from "./src/components/coins/CoinsStack";
import Colors from "./src/res/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesStack from "./src/components/favorites/FavoritesStack";

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tabs.Navigator
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            style: {
              backgroundColor: Colors.blackPearl,
            },
          }}
        >
          <Tabs.Screen
            name="Coins"
            component={CoinsStack}
            options={{
              tabBarIcon: ({ size, color }) => {
                return (
                  <Image
                    style={{ tintColor: color, width: size, height: size }}
                    source={require("./assets/bank.png")}
                  />
                );
              },
            }}
          />
          <Tabs.Screen
            name="Favorites"
            component={FavoritesStack}
            options={{
              tabBarIcon: ({ size, color }) => {
                return (
                  <Image
                    style={{ tintColor: color, width: size, height: size }}
                    source={require("./assets/star.png")}
                  />
                );
              },
            }}
          />
        </Tabs.Navigator>
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
