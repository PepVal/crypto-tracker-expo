import React from "react";
import { useState } from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import Svg, { Path } from "react-native-svg";
import Colors from "../../res/colors";
import IconPath from "../../res/iconPath";

const CoinsSearch = ({ onChange }) => {
  const [query, setQuery] = useState("");

  const handleText = (query) => {
    setQuery(query);
    if (onChange) {
      onChange(query);
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === "ios" ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Seach coin"
        placeholderTextColor={Colors.gray}
      />
      <View style={styles.iconInput}>
        <Svg height={30} width={30} viewBox="0 0 24 24">
          <Path d={IconPath.magnify} fill={Colors.white} />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconInput: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: Colors.white,
  },
  textInputAndroid: {
    borderWidth: 1,
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinsSearch;
