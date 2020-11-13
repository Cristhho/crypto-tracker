import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from 'cryptoTracker/src/res/colors';
import CoinsStack from 'cryptoTracker/src/components/coins/CoinsStack';
import FavoritesStack from 'cryptoTracker/src/components/favorites/FavoritesStack';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: colors.blackPearl
          }
        }}>
        <Tabs.Screen component={CoinsStack} name='Coins'
          options={{
            tabBarIcon: ({ size, color }) =>
              <Image
                source={require('cryptoTracker/src/assets/bank.png')}
                style={{
                  tintColor: color,
                  width: size,
                  height: size
                }} />
          }}/>
        <Tabs.Screen component={FavoritesStack} name='Favorites'
          options={{
            tabBarIcon: ({ size, color }) =>
              <Image
                source={require('cryptoTracker/src/assets/star.png')}
                style={{
                  tintColor: color,
                  width: size,
                  height: size
                }} />
          }}/>
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
