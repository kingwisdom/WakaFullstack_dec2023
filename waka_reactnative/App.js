import 'react-native-gesture-handler';
import * as React from 'react';
import TabNavigator from './navigation/TabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from './src/screens/Landing';
import SplashScreen from 'react-native-splash-screen';
import ChooseCity from './src/screens/ChooseCity';
import AllPlaces from './src/screens/AllPlaces';
import PlacesInCat from './src/screens/PlacesInCat';
const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="ChooseCity" component={ChooseCity} />
        <Stack.Screen name="All" component={AllPlaces} />
        <Stack.Screen name="PlacesInCat" component={PlacesInCat} />
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
