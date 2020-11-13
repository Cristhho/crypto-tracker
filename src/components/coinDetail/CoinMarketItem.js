import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from 'cryptoTracker/src/res/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.1)',
    borderColor: colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginRight: 8,
    alignItems: 'center'
  },
  nameText: {
    fontWeight: 'bold'
  }
});

export default function CoinMarketItem({ item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text>{item.price_usd}</Text>
    </View>
  )
}