import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../../confog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Searchbar} from 'react-native-paper';
import Colors from '../constant/Colors';

const PlacesInCat = ({route}) => {
  const {id, name} = route.params;
  console.log(name);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPlaces();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('city');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const getPlaces = async () => {
    setLoading(true);
    fetch(`${BASE_URL}place/categoryplace/${id}`)
      .then(res => res.json())
      .then(response => {
        if (response.status) {
          setPlaces(response.returnObj);
          //   console.log(response);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const [search, setSearch] = useState([]);

  const onChangeSearch = query => {
    if (query.trim().length < 2) {
      setSearch(null);
    } else {
      const filteredData = places.filter(item => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      });
      console.log(filteredData);
      if (filteredData.length > 0) setSearch(filteredData);
      else setSearch(null);
    }
    // setSearch(filteredData);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState({});
  const handlePress = item => {
    setModalVisible(true);
    setItems(item);
  };

  const handleMap = item => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`maps://?${item}`).catch(err =>
        console.error('An error occurred', err),
      );
    } else {
      Linking.openURL(`https://www.google.com/maps/dir//${item}`).catch(err =>
        console.error('An error occurred', err),
      );
    }
  };
  return (
    <>
      <SafeAreaView>
        <Text
          style={{
            color: '#000',
            fontWeight: '700',
            fontSize: 24,
            textAlign: 'center',
            marginVertical: 30,
          }}>
          {name}
        </Text>
        <Searchbar
          placeholder="Search"
          onChangeText={value => onChangeSearch(value)}
          style={{marginHorizontal: 15}}
        />
        {loading && <ActivityIndicator size={'large'} style={{zIndex: 12}} />}
        <ScrollView>
          <>
            {search?.length > 0 ? (
              <>
                {search?.map((er, i) => (
                  <TouchableOpacity key={i}>
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
                      <View>
                        <Image
                          source={{
                            uri: er.imageUrl,
                          }}
                          resizeMode="cover"
                          style={{
                            width: 50,
                            height: 50,
                            marginRight: 20,
                            borderRadius: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: '#000',
                          }}>
                          {er.name}
                        </Text>
                        <Text>{er.address}</Text>
                      </View>
                      <Icon name="angle-right" size={16} color={'#000'} />
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <>
                {places?.map((er, i) => (
                  <TouchableOpacity key={i} onPress={() => handlePress(er)}>
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
                      <View>
                        <Image
                          source={{
                            uri: er.imageUrl,
                          }}
                          resizeMode="cover"
                          style={{
                            width: 50,
                            height: 50,
                            marginRight: 20,
                            borderRadius: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: '#000',
                          }}>
                          {er.name}
                        </Text>
                        <Text>{er.address}</Text>
                      </View>
                      <Icon name="angle-right" size={16} color={'#000'} />
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText1}>{items.name}</Text>
              <Text style={styles.modalText}>{items.address}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'space-around',
                  marginBottom: 15,
                }}>
                {items?.phoneNumber !== 'Not Provided' ||
                  (items?.phoneNumber !== null && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(`tel:${items?.phoneNumber}`)
                      }>
                      <Icon name="phone" size={24} color={Colors.red400} />
                    </TouchableOpacity>
                  ))}

                <TouchableOpacity onPress={() => handleMap(items?.address)}>
                  <Icon
                    name="map-marker"
                    size={24}
                    style={{marginLeft: 15}}
                    color={Colors.red400}
                  />
                </TouchableOpacity>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText1: {
    marginBottom: 15,
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default PlacesInCat;
