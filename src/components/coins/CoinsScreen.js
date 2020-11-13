import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import Http from 'cryptoTracker/src/libs/http';
import CoinItem from './CoinItem';
import colors from 'cryptoTracker/src/res/colors';
import CoinSearch from './CoinSearch';

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false
  }

  componentDidMount = async() => {
    this.setState({
      loading: true
    })
    const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');

    this.setState({
      coins: res.data,
      allCoins: res.data,
      loading: false
    })
  }

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', { coin });
  }

  handleSearch = (query) => {
    const { allCoins } = this.state;

    const coinsFilter = allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
    });

    this.setState({
      coins: coinsFilter
    });
  }

  render() {
    const {coins, loading} = this.state;

    return(
      <View>
        <CoinSearch onChange={this.handleSearch} />
        {loading ?
          <ActivityIndicator color='#fff' size='large' style={styles.loader} />
          : null
        }
        <FlatList
          data={coins}
          renderItem={({item}) =>
            <CoinItem item={item} onPress={() => this.handlePress(item)} />} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade
  },
  loader: {
    marginTop: 60
  }
})

export default CoinsScreen;
