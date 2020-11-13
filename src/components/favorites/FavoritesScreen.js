import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import FavoritesEmptyState from './FavoritesEmptyState';
import Storage from 'cryptoTracker/src/libs/storage';
import CoinItem from 'cryptoTracker/src/components/coins/CoinItem';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class FavoritesScreen extends Component {
  state = {
    favorites: []
  }

  getFavorites = async() => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favsObject = await Storage.instance.getAll(keys);
      const favs = favsObject.map((fav) => JSON.parse(fav[1]));
      this.setState({ favorites: favs });
    } catch (err) {
      console.error(err);
    }
  }

  handlePress = (coin) => {
    this.props.navigation.navigate("CoinDetail", { coin });
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this.getFavorites);
  }
  
  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorites);
  }

  render() {
    const { favorites } = this.state;
    return (
      <View style={styles.container}>
        {favorites.length === 0 ?
          <FavoritesEmptyState /> :
          <FlatList
            data={favorites}
            renderItem={({item}) => <CoinItem item={item} onPress={() => this.handlePress(item)} />}
          />
        }
      </View>
    )
  }
}
