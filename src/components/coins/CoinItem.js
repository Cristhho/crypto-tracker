import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import colors from '../../res/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderColor: colors.zircon,
    borderBottomWidth: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  symbolText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12
  },
  nameText: {
    fontSize: 14,
    marginRight: 12
  },
  priceText: {
    fontSize: 14
  },
  percentText: {
    fontSize: 12,
    marginRight: 8
  },
  icon: {
    width: 22,
    height: 22
  }
});

export default function CoinItem({ item, onPress }) {
  getImageArrow = () => {
    if(item.percent_change_1h > 0)
      return require('cryptoTracker/src/assets/arrow_up.png');
    else
      return require('cryptoTracker/src/assets/arrow_down.png');
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image source={getImageArrow()} style={styles.icon} />
      </View>
    </Pressable>
  );
}
