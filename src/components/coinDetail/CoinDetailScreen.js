import React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import Http from "../../libs/http";
import Storage from "../../libs/storage";
import Colors from "../../res/colors";
import CoinMarketItem from "./CoinMarketItem";

const CoinDetailScreen = ({ navigation, route }) => {
  const [coin, setCoin] = useState({});
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const { coin } = route.params;
    navigation.setOptions({ title: coin.symbol });
    getMarkets(coin.id);
    setCoin(coin);

    getFavorite(coin.id);
  }, []);

  const getSymbolIcon = (nameStr) => {
    if (nameStr) {
      const symbol = nameStr.toLowerCase().replace(" ", "-");
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const getSections = (coin) => {
    const sections = [
      {
        title: "Market cap",
        data: [coin.market_cap_usd],
      },
      {
        title: "Volume 24h",
        data: [coin.volume24],
      },
      {
        title: "Change 24h",
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    setMarkets(markets);
  };

  const getFavorite = async (coinId) => {
    try {
      const favStr = await Storage.instance.get(`favorite-${coinId}`);
      if (favStr) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log("get favorites error", error);
    }
  };

  const toogleFavorites = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const coinStr = JSON.stringify(coin);
    const stored = await Storage.instance.store(`favorite-${coin.id}`, coinStr);
    if (stored) {
      setIsFavorite(true);
    }
  };

  const removeFavorite = async () => {
    Alert.alert("Remove favorite", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: async () => {
          await Storage.instance.remove(`favorite-${coin.id}`);
          setIsFavorite(false);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{ uri: getSymbolIcon(coin.name) }}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={toogleFavorites}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}
        >
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? "Remove favorites" : "Add favorites"}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <SectionItem item={item} />}
        renderSectionHeader={({ section }) => (
          <SectionHeader section={section} />
        )}
      />
      <Text style={styles.marketText}>Markets</Text>
      <FlatList
        ListEmptyComponent={<Text style={styles.loadingText}>loading...</Text>}
        style={styles.listMarkets}
        horizontal
        keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
        data={markets}
        renderItem={({ item }) => <CoinMarketItem market={item} />}
      />
    </View>
  );
};

const SectionItem = ({ item }) => (
  <View style={styles.sectionItem}>
    <Text style={styles.itemText}>{item}</Text>
  </View>
);

const SectionHeader = ({ section }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionText}>{section.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  subHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "bold",
    marginStart: 8,
  },
  iconImg: {
    width: 30,
    height: 30,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  marketText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    marginStart: 16,
  },
  listMarkets: {
    maxHeight: 100,
    paddingStart: 16,
    paddingEnd: 16,
  },
  loadingText: {
    color: Colors.white,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
