import React, { Component } from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';

import colors from 'cryptoTracker/src/res/colors';

const styles = StyleSheet.create({
  input: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16
  },
  inputAndroid: {
    borderWidth: 2,
    borderBottomColor: colors.zircon
  },
  inputIos: {
    margin: 8,
    borderRadius: 8
  }
});

export default class CoinSearch extends Component {
  state = {
    query: ''
  };

  handleText = (query) => {
    this.setState({ query });

    if(this.props.onChange)
      this.props.onChange(query);
  }
  
  render() {
    return (
      <View>
        <TextInput
          style={[styles.input, Platform.OS == 'ios' ? styles.inputIos : styles.inputAndroid]}
          onChangeText={this.handleText}
          value={this.state.query}
          placeholder='Search coin' placeholderTextColor='#fff' />
      </View>
    );
  }
}
