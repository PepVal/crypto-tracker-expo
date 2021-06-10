import React from "react";
import { useState } from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import Colors from "../../res/colors";

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
        placeholderTextColor={Colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: Colors.white
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
