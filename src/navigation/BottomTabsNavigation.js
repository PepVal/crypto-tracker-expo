import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CoinsStack from "../components/coins/CoinsStack";
import FavoritesStack from "../components/favorites/FavoritesStack";
import Colors from "../res/colors";

const Tabs = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: Colors.picton,
        inactiveTintColor: "gray",
        labelStyle: {
          fontWeight: "bold",
          marginBottom: 2,
        },
        iconStyle: {
          marginTop: 2,
        },
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
                source={require("../../assets/bank.png")}
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
                source={require("../../assets/star.png")}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabsNavigation;
