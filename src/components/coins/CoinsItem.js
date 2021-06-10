import React from "react";
import { View, Text, StyleSheet, Image, Platform, Pressable } from "react-native";
import Colors from "../../res/colors";

const CoinsItem = ({ item, onPress }) => {
  const getImageArrow = (percent) => {
    if (percent > 0) {
      return require("../../../assets/arrow_up.png");
    } else {
      return require("../../../assets/arrow_down.png");
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.constainer}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image
          style={styles.imageIcon}
          source={getImageArrow(item.percent_change_1h)}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 2,
    paddingStart: Platform.OS == "ios" ? 0 : 16,
    marginStart: Platform.OS == "ios" ? 16 : 0,
  },
  row: {
    flexDirection: "row",
    alignItems:"center"
  },
  symbolText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    marginEnd: 12,
  },
  nameText: {
    color: Colors.white,
    fontSize: 14,
    marginEnd: 16,
  },
  percentText: {
    color: Colors.white,
    fontSize: 12,
    marginEnd: 8,
  },
  priceText: {
    color: Colors.white,
    fontSize: 14,
  },
  imageIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinsItem;
