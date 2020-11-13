import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, SectionList, FlatList, Pressable, Alert } from 'react-native';

import colors from 'cryptoTracker/src/res/colors';
import Http from 'cryptoTracker/src/libs/http';
import Storage from 'cryptoTracker/src/libs/storage';
import CoinMarketItem from './CoinMarketItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade
  },
  row: {
    flexDirection: 'row'
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,.1)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  icon: {
    width: 25,
    height: 25
  },
  section: {
    maxHeight: 220
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,.2)',
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    fontSize: 14
  },
  sectionText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  markets: {
    maxHeight: 100,
    paddingLeft: 16
  },
  marketTitle: {
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold'
  },
  favorite: {
    padding: 8,
    borderRadius: 8
  },
  addFavorite: {
    backgroundColor: colors.picton
  },
  removeFavorite: {
    backgroundColor: colors.carmine
  },
  favoriteText: {
    color: colors.white
  }
});

export default class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false
  }

  componentDidMount() {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({
      title: coin.symbol
    })
    this.getMarkets(coin.id);
    this.setState({
      coin
    }, () => {
      this.getFavorite();
    });
  }
  
  getSymbolIcon = (coinId) => {
    if(coinId)
      return `https://c1.coinlore.com/img/16x16/${coinId}.png`;
  }

  getSections = (coin) => {
    const data = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd]
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24]
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h]
      }
    ]

    return data;
  }

  getMarkets = async(coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);

    this.setState({
      markets
    });
  }

  toggleFavorite = () => {
    if(this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  }

  addFavorite = async() => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;
    const stored = await Storage.instance.store(key, coin);
    if(stored)
      this.setState({ isFavorite: true });
  }

  removeFavorite  = () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Remove',
        onPress: async() => {
          const key = `favorite-${this.state.coin.id}`;
          const removed = await Storage.instance.remove(key);
          if(removed)
            this.setState({ isFavorite: false });
        },
        style: 'destructive'
      }
    ]);
  }

  getFavorite = async() => {
    const key = `favorite-${this.state.coin.id}`;
    try {
      const fav = await Storage.instance.get(key);
      if(fav != null)
        this.setState({ isFavorite: true });
    } catch (err) {
      
    }
  }

  render() {
    const { coin, markets, isFavorite } = this.state;
    return (
      <View>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image style={styles.icon} source={{uri: this.getSymbolIcon(coin.nameid)}} />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
          <Pressable onPress={this.toggleFavorite} style={[
            styles.favorite,
            isFavorite ? styles.removeFavorite : styles.addFavorite
          ]}>
            <Text style={styles.favoriteText}>{isFavorite ? 'Remove' : 'Add'} favorites</Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          keyExtractor={(item) => item}
          sections={this.getSections(coin)}
          renderItem={({item}) => <View style={styles.sectionItem}><Text style={styles.itemText}>{item}</Text></View>}
          renderSectionHeader={({section}) => <View style={styles.sectionHeader}><Text style={styles.sectionText}>{section.title}</Text></View>} />
        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          style={styles.markets}
          horizontal={true}
          data={markets}
          keyExtractor={(item) => `${item.name}-${item.base}-${item.quote}`}
          renderItem={({item}) => <CoinMarketItem item={item} />} />
      </View>
    )
  }
}
