import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../confog'
import { useNavigation } from '@react-navigation/native'

const PopularPlaces = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = ()=>{
    setLoading(true)
    fetch(`${BASE_URL}place/placeInCat`)
    .then((res)=>res.json())
    .then((response)=>{
      if(response.status){
        // console.log(response);
        setCategories(response.returnObj);
      }
    })
    .catch(err=>console.log(err))
    setLoading(false)
  }

  return (
    <SafeAreaView>
      {loading && <ActivityIndicator size={'large'} />}
      <Text
        style={{
          color: '#000',
          fontWeight: '700',
          fontSize: 24,
          textAlign: 'center',
          marginVertical: 30,
        }}>
        Categories
      </Text>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('All')}>
          <View
            style={{
              backgroundColor: '#fff',
              marginVertical: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 15,
              padding: 15,
              borderRadius: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000'}}>
              All Places
            </Text>
          </View>
        </TouchableOpacity>
        {categories?.map((er, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate('PlacesInCat', {id:er?.categoryId, name:er?.categoryName})}>
            <View
              style={{
                backgroundColor: '#fff',
                marginVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
                padding: 15,
                borderRadius: 10,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000'}}>
                {er.categoryName}
              </Text>
              <Text>{er.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default PopularPlaces