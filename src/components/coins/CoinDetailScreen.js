import React from "react";
import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, SectionList } from "react-native";
import Colors from "../../res/colors";

const CoinDetailScreen = ({ navigation, route }) => {
  const [coin, setCoin] = useState({});

  useEffect(() => {
    const { coin } = route.params;
    navigation.setOptions({ title: coin.symbol });
    setCoin(coin);
  }, []);

  const getSymbolIcon = (nameStr) => {
    if (nameStr) {
      const symbol = nameStr.toLowerCase().replace(" ", "-");
      return `https://c1.coinlore.com/img/16x16/${symbol}.png`;
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

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image
          style={styles.iconImg}
          source={{ uri: getSymbolIcon(coin.name) }}
        />
        <Text style={styles.titleText}>{coin.name}</Text>
      </View>
      <SectionList
        sections={getSections(coin)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
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
  subHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 16,
    flexDirection: "row",
  },
  titleText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "bold",
    marginStart: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
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
});

export default CoinDetailScreen;
