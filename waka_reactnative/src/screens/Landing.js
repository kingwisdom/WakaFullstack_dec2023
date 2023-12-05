
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Share,
} from 'react-native';
import Colors from '../constant/Colors';
import { Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Landing = () => {
    const navigation = useNavigation();

    useEffect(() => {
     getData();
    }, [])
    
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('city');
        if(!jsonValue){
          navigation.navigate('ChooseCity');
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };

     const onShare = async () => {
       try {
         const result = await Share.share({
           message:
             'Please Download Now! https://play.google.com/store/apps/details?id=com.productdrive.wakalocation',
         });
         if (result.action === Share.sharedAction) {
           if (result.activityType) {
             // shared with activity type of result.activityType
           } else {
             // shared
           }
         } else if (result.action === Share.dismissedAction) {
           // dismissed
         }
       } catch (error) {
         alert(error.message);
       }
     };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/traffic.jpg')}
        resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          flex: 1,
          justifyContent: 'flex-end',
          opacity: 0.9,
        }}>
        <View style={{backgroundColor: '#000'}}>
          <View
            style={{
              margin: 20,
            }}>
            <Text
              style={{
                color: Colors.white,
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              See real time traffic now towards your destination
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: 14,
              }}></Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              marginHorizontal: 20,
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('TabNavigator')}>
            <Text
              style={{fontWeight: 'bold', fontSize: 16, color: Colors.black}}>
              Continue
            </Text>
          </TouchableOpacity>
          <Divider
            style={{
              backgroundColor: Colors.white,
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              marginHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <Pressable onPress = {onShare}>
              <Text style={styles.bottomLink}>share</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Linking.openURL('mailto:adeoyetemitayo99@gmail.com')
              }>
              <Text style={styles.bottomLink}>Contact us</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Landing

const styles = StyleSheet.create({
  bottomLink: {color: Colors.white, fontWeight: '700'},
});