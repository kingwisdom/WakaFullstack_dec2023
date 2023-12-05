import { View, Text, SafeAreaView,TextInput,TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator, Alert} from 'react-native'
import React from 'react'
import Colors from '../constant/Colors';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';

const Item = item => (
  <>
    <View
      style={{
        width: '100%',
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 15,
        flexDirection: 'row',
      }}>
      <Image
        source={{
          uri: 'https://previews.123rf.com/images/scusi/scusi1803/scusi180300003/96678344-road-traffic-in-the-city-illustration.jpg',
        }}
        resizeMode="cover"
        style={{width: 80, height: 80, marginRight: 20, borderRadius: 10}}
      />

      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="circle" size={18} color={item.Data.trafficColor} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: Colors.black,
              marginLeft: 20,
            }}>
            {item?.Data.trafficStatus}
          </Text>
        </View>
        <Text style={{fontSize: 14, marginVertical: 10, fontStyle: 'italic'}}>
          {item?.Data.via}
        </Text>
        <Divider style={{marginVertical: 10}} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="car" size={24} color="red" />
          <View style={{marginLeft: 15}}>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <Text style={{}}>Normal Time</Text>
              <Text
                style={{
                  marginLeft: 20,
                  color: Colors.black,
                  fontWeight: 'bold',
                }}>
                {item?.Data.normalTime}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{}}>Traffic Time</Text>
              <Text
                style={{
                  marginLeft: 20,
                  color: Colors.black,
                  fontWeight: 'bold',
                }}>
                {item?.Data.trafficTime}
              </Text>
            </View>
          </View>
        </View>
        <Divider style={{marginTop: 15}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Text style={{marginLeft: 20, color: Colors.black}}>Distance</Text>
          <Text
            style={{marginRight: 20, color: Colors.black, fontWeight: 'bold'}}>
            {item?.Data.distance}
          </Text>
        </View>
      </View>
    </View>
  </>
);

const Home = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState();
  let [response, setResponse] = useState();
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [DATA, setDATA] = useState([])

  useEffect(()=> {
    //fetchData();
  }, []);

  const handleSearch = () => {
    if(!from || !to){
      return Alert.alert("Error!", "Please fill your location")
    }
    setIsLoading(true)
    fetch(
      `https://dev.virtualearth.net/REST/V1/Routes/Driving?o=json&wp.0=${from+" Lagos, Nigeria"}&wp.1=${to+" Lagos, Nigeria"}&maxSolns=3&optmz=timeWithTraffic&key=AjFc0im6uSRCTMsEeyIcgHnTlc-E1O42J0G0mIVeU65vDw1cmc_eHB-8z8xh7tRo#`,
    )
      .then(res => res.json())
      .then(result => {
        setIsLoading(false);
        const returnObj = trafficAnalysis(result)
        setDATA(returnObj);
       setTo('');
       setFrom('');
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
        setTo('');
        setFrom('');
      });
       
  }

  const formatTime = timeString => {
    timeArr = timeString.split(':');
    if (timeArr[0].charAt(0) == '0') {
      timeArr[0] = timeArr[0].charAt(1);
    }
    timeres =
      timeArr[0] == '00' || timeArr[0] == '0'
        ? `${timeArr[1]}mn ${timeArr[2]}s`
        : `${timeArr[0]}hr ${timeArr[1]}mn ${timeArr[2]}s`;
    return timeres;
  };

  const getTrafficColor = trafficStatus => {
    let colour = '';
    switch (trafficStatus) {
      case 'None':
        colour = '#00FF00';
        break;
      case 'Mild':
        colour = '#e2f567';
        break;
      case 'Medium':
        colour = '#FFBF00';
        break;
      case 'Heavy':
        colour = '#FF0000';
        break;

      default:
        colour = '#282929';
        break;
    }
    return colour;
  };
  const getContent = () => {
    if(isLoading){
      return <ActivityIndicator size={"large"} />
    }
  };

  const trafficAnalysis = respObj => {
    let returnedRouteData  = [];
    let majorRoutes = respObj.resourceSets[0].resources;
    for (let i = 0; i < majorRoutes.length; i++) {
      let routeData = {
        trafficStatus: majorRoutes[i].trafficCongestion,
        trafficColor: getTrafficColor(majorRoutes[i].trafficCongestion),
        normalTime: formatTime(
          new Date(majorRoutes[i].travelDuration * 1000)
            .toISOString()
            .substring(11, 19),
        ),
        trafficTime: formatTime(
          new Date(majorRoutes[i].travelDurationTraffic * 1000)
            .toISOString()
            .substring(11, 19),
        ),
        distance: `${Math.round(majorRoutes[i].travelDistance)}km`,
        via: majorRoutes[i].routeLegs[0].description,
      };
      console.table(routeData);
      returnedRouteData.push(routeData);
    }
    return returnedRouteData;
  };


  return (
    <SafeAreaView style={{backgroundColor: '#eee'}}>
      <ScrollView>
        <Text style={{textAlign: 'center', marginTop: 20, fontWeight: 'bold'}}>
          Get to your Destination quick
        </Text>
        <View
          style={{
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 10,
            margin: 20,
            paddingHorizontal: 10,
          }}>
          <TextInput
            placeholder="Current location"
            onChangeText={value => setFrom(value)}
          />
        </View>
        <View
          style={{
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 20,
            paddingHorizontal: 10,
          }}>
          <TextInput
            placeholder="Destination"
            onChangeText={value => setTo(value)}
          />
        </View>

        <TouchableOpacity
          style={{
            width: '80%',
            backgroundColor: Colors.primary,
            height: 40,
            alignItems: 'center',
            marginHorizontal: '10%',
            textAlign: 'center',
            justifyContent: 'center',
            marginTop: 10,
            borderRadius: 20,
          }}
          onPress={handleSearch}>
          <Text style={{color: '#fff', fontWeight: '600'}}>
            {isLoading ? 'Getting Details...' : 'Locate'}
          </Text>
        </TouchableOpacity>
        <Divider style={{marginVertical: 20}} />

        <Text style={{textAlign: 'center'}}>Real Time Traffic </Text>

        {/* flat list */}
        <View>{getContent()}</View>
        {DATA && <View style={{}}>
          {
            DATA.map((item,i) => (
              <Item Data={item} />
            ))}
            </View>
          }
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home