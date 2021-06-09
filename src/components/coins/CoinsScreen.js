import React from "react";
import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Http from "../../libs/http";
import Colors from "../../res/colors";
import { BASE_API } from "../../server/api";
import CoinsItem from "./CoinsItem";

const CoinsScreen = ({ navigation }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const coins = await Http.instance.get(`${BASE_API}/tickers`);
      setLoading(false);
      setCoins(coins.data);
    })();
  }, []);

  const handlePress = (coin) => {
    navigation.navigate("CoinDetail",{coin});
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator color="#fff" size="large" /> : null}
      <FlatList
        data={coins}
        renderItem={({ item }) => (
          <CoinsItem item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
});

export default CoinsScreen;
