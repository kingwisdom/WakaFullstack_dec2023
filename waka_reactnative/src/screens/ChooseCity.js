import * as React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import { BASE_URL } from '../../confog';
import { Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ChooseCity = () => {
const navigation = useNavigation();
  const [city, setCity] = useState([]);
  useEffect(() => {
    getCity();
  }, []);
  const getCity = () => {
    fetch(`${BASE_URL}city`)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      setCity(response.returnObj);
    })
    .catch(err=>console.log(err));
  };

  const handleSelectCity = async (item) => {
    const jsonValue = JSON.stringify(item);
    try {
      await AsyncStorage.setItem('city', jsonValue)
      navigation.navigate('Landing')
    } catch (e) {
      // saving error
    }
  }
  return (
    <SafeAreaView style={{backgroundColor: '#000', flex: 1}}>
      <Text
        style={{
          color: '#fff',
          fontWeight: '700',
          fontSize: 24,
          textAlign: 'center',
          marginVertical: 30,
        }}>
        Choose City
      </Text>

<Text style={{color:'#fff', textAlign:'center', marginBottom:20}}>Please select your current city</Text>
      {city?.map((er, i) => (
        <>
        <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>handleSelectCity(er)}>
          <View key={i}>
            <Text style={{color: '#fff', fontSize:18, fontWeight:'600'}}>{er.name}</Text>
          </View>
        </TouchableOpacity>
        <Divider style={{backgroundColor:'#fff', marginHorizontal:50, marginVertical:10}} />
        </>
      ))}
    </SafeAreaView>
  );
};

export default ChooseCity;
