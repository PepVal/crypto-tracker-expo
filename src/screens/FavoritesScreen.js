import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Storage from "../libs/storage";
import Colors from "../res/colors";
import CoinsItem from "../components/coins/CoinsItem";
import FavoritesEmptyState from "../components/favorites/FavoritesEmptyState";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
    const unsubscribe = navigation.addListener("focus", getFavorites);
    return unsubscribe;
  }, []);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes("favorite-"));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map((fav) => JSON.parse(fav[1]));
      setFavorites(favorites);
    } catch (error) {
      console.log("get favorites error", error);
    }
  };

  const handlePress = (coin) => {
    navigation.navigate("CoinDetail", { coin });
  };

  return (
    <View style={styles.container}>
      {favorites.length == 0 ? <FavoritesEmptyState /> : null}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
