import { View, Text } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper'

const Startup = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontWeight: '700', color: '#000', fontSize: 24}}>
        ProductDrive
      </Text>
      <Divider style={{backgroundColor: 'red', marginVertical: 5}} />
      <Text style={{fontWeight: '500'}}>+234 816 792 7876</Text>
      <Divider style={{backgroundColor: 'red', marginVertical: 5}} />
      <Text style={{fontWeight: '700'}}>admin@productdrive.com.ng</Text>
      <Divider style={{backgroundColor: 'red', marginVertical: 5}} />
      <Text style={{fontWeight: '700'}}>www.productdrive.com.ng</Text>
    </View>
  );
}

export default Startup