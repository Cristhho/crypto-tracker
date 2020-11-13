import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});

export default function FavoritesEmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any favorite coin</Text>
    </View>
  )
}
