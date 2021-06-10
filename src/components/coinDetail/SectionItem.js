import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../res/colors";

const SectionItem = ({ item }) => (
  <View style={styles.sectionItem}>
    <Text style={styles.itemText}>{item}</Text>
  </View>
);

const styles = StyleSheet.create({
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
});

export default SectionItem;
