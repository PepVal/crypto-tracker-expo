import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../res/colors";

const CoinMarketItem = ({ market }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{market.name}</Text>
      <Text style={styles.priceText}>{market.price_usd}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderColor: Colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginEnd: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  nameText: {
    fontWeight: "bold",
    color: Colors.white,
  },
  priceText: {
    color: Colors.white,
  },
});

export default CoinMarketItem;
