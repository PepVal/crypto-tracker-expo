import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { BASE_API } from "../server/api";
import Http from "../libs/http";
import Colors from "../res/colors";
import CoinsItem from "../components/coins/CoinsItem";
import CoinsSearch from "../components/coins/CoinsSearch";

const CoinsScreen = ({ navigation }) => {
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCoins();
  }, []);

  const getCoins = async () => {
    const coins = await Http.instance.get(`${BASE_API}/tickers`);
    setCoins(coins.data);
    setAllCoins(coins.data);
    setLoading(false);
  };

  const handlePress = (coin) => {
    navigation.navigate("CoinDetail", { coin });
  };

  const handleSearch = (query) => {
    const coinsFilter = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    setCoins(coinsFilter);
  };

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
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
