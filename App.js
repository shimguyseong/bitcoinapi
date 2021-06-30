import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, Text} from 'react-native';
import style from './styles';
import {
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

function App() {
  let [count, setCount] = useState([]);

  useEffect(() => {
      addressApiCall();
  }, []);

  const addressApiCall = async addr => {
    try {
      const response = await axios.get(
        'http://172.21.129.205:4000/api/listtransactions/*',
      );
      setCount(response.data);
    } catch (e) {
      console.error(addr + "'s info load failed");
      console.error(e);
    }

  };


  let listItemView = item => {
      return (
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 5,
            borderColor: '#424242',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={style.smalltext}> category : {item.category}</Text>
            <Text style={style.smalltext}> amount : {item.amount}</Text>
            <Text style={style.smalltext}> confirmations : {item.confirmations}</Text>
            <Text style={style.smalltext}> address : {item.address}</Text>
          </View>
        </View>
      );
    };

  return (
      <View style={style.Body}>
              <KeyboardAvoidingView style={{flex: 1}}>
                <Text></Text>
                <FlatList
                  data={count.result}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => listItemView(item)}
                />
              </KeyboardAvoidingView>
            </View>
  );
}
export default App;