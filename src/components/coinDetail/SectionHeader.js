import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../res/colors";

const SectionHeader = ({ section }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionText}>{section.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 8,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SectionHeader;
