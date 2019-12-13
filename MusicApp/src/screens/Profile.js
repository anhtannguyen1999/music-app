import React, {Component, cloneElement} from 'react';
import {StyleSheet, View, FlatList, Text,Button, TouchableOpacity,SafeAreaView,AsyncStorage} from 'react-native';

import TrackPlayer from 'react-native-track-player';
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { setSongPlay  } from '../redux/action';
 class ProfileScreen extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      temp:''
    };

  }
  static navigationOptions = {
    header: null,
  };

   userId = '8ba790f3-5acd-4a08-bc6a-97a36c124f29';
 saveUserId = async userId => {
  try {
    await AsyncStorage.setItem('userId', 'haha');
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

 getUserId = async () => {
  let userId = '';
  try {
    userId = await AsyncStorage.getItem('userId') || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return userId;
}

getId()
{
 AsyncStorage.getItem('Id').then((value)=>{
   this.setState({temp:value})
 });

}
saveId()
{
  AsyncStorage.setItem('Id',"9999999999999")
}





  
  componentDidMount() {
    //this.saveUserId('123456')
    this.saveId();


  }
 



  render() {
    var tt=[
      {
        id:1,
        value:"111"
      },
      {
        id:2,
        value:"222"
      },
      {
        id:3,
        value:"333"
      }
    ]
    const data = [
      "Apples",
      "Broccoli",
      "Chicken",
      "Duck",
      "Eggs",
      "Fish",
      "Granola",
      "Hash Browns",
    ];
   console.log(this.state.temp)

    return (
      <View style={styles.autocompletesContainer}>
        <Button title='Save data' onPress={()=>{}}>
          
        </Button>
        
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { myCurrentSong: state.currentSong };
}

export default connect(mapStateToProps, {setSongPlay})(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 1000,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 8,
    alignSelf:'stretch'
  },
  input: {maxHeight: 40},
  con1:{
    width:"100%",
    fontSize:20, 
    color:"#000",
  },
  con2:{
    width:"100%",
     fontSize:20, 
     color:"#f0f",
    color:"#F45"
  },

  input: {maxHeight: 40},
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },

});
