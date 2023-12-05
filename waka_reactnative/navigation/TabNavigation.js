import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../src/screens/Home';
import PopularPlaces from '../src/screens/PopularPlaces';
import Startup from '../src/screens/Startup';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../src/constant/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.bottomBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const {options} = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? Colors.red200 : Colors.gray;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onPress()}
            testID={options.tabBarTestID}
            accessibilityRole="button">
            {index === 0 && (
              <View style={styles.icon}>
                {isFocused ? (
                  <Icon name="home" size={24} color={color} />
                ) : (
                  <Icon name="home" size={24} color={color} />
                )}
              </View>
            )}
            {index === 1 && (
              <View style={styles.middleIcon}>
                {isFocused ? (
                  <Icon name="map" size={24} color={'#fff'} />
                ) : (
                  <Icon name="map-marker" size={24} color={'#fff'} />
                )}
              </View>
            )}
            {index === 2 && (
              <View style={styles.icon}>
                {isFocused ? (
                  <Icon name="info" size={24} color={color} />
                ) : (
                  <Icon name="info" size={24} color={color} />
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Places" component={PopularPlaces} />
      <Tab.Screen name="Profile" component={Startup} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  middleIcon: {
    bottom: 18,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    elevation: 8,
  },
});

export default TabNavigator;
