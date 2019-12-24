import React, {Component, cloneElement} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  AsyncStorage,
  Image,
  TextInput,
} from 'react-native';

import TrackPlayer from 'react-native-track-player';
import {
  Autocomplete,
  withKeyboardAwareScrollView,
} from 'react-native-dropdown-autocomplete';

import Icon from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {setSongPlay} from '../redux/action';
import Player from '../player/Player';
import {FirebaseApp} from '../components/FirebaseConfig.js';
import ItemComment from '../components/ItemComment';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onEditName: false,
      tempName:'',
      onEditPhone: false,
      tempPhone:'',
      phoneNumber:'',
      onRePass:false,
      pass:'',
      newPass:'',
      re_newPass:'',
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    var t = new Date();
    console.log(FirebaseApp.auth().currentUser.displayName);
    console.log( this._refeshPhone())
   
    // FirebaseApp.auth().currentUser.updateProfile({displayName:'Thang Music',photoURL:'http://prod-upp-image-read.ft.com/cb04f9ee-e8f0-11e9-aefb-a946d2463e4b'})
  }

  _renderEdit(type) {
 
    if(type=='updateName'){
      if (this.state.onEditName == false) {
        return (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity onPress={() => this.setState({onEditName: true})}>
              <Icon name="edit" size={20}></Icon>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'flex-end',
              //justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity onPress={()=>{ this._updateName()}}>
              <Icon name="check" size={20}></Icon>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.setState({onEditName: false})}>
              <Icon name="window-close" size={20}></Icon>
            </TouchableOpacity>
          </View>
        );
      }

    }
   else 
    if(type=='updatePhone'){
      if (this.state.onEditPhone == false) {
        return (
         
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity onPress={() => this.setState({onEditPhone: true})}>
              <Icon name="edit" size={20}></Icon>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'flex-start',
              //justifyContent: '',
            }}>
            <TouchableOpacity onPress={()=>{ this._updatePhone()}}>
              <Icon name="check" size={20}></Icon>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.setState({onEditPhone: false})}>
              <Icon name="window-close" size={20}></Icon>
            </TouchableOpacity>
            
          </View>
          
        );
      }

    }
  }

  _renderRePass()
  {
    if(!this.state.onRePass)
    return(
      <TouchableOpacity onPress={()=>{this.setState({onRePass:true})}}>
    <View style={styles.conItem}>
    <Text> </Text>
      <Icon name="lock" size={20}></Icon>
      <Text> ChangePass </Text>
      <TextInput
      secureTextEntry={true}
        style={{height: 40, width: '65%'}}
        value={ "aaaaaaaaaaaaaaaaaaaaaa"}
        placeholder={'null'}
        editable={false}
        onChangeText={(text)=>{ if(this.state.onEditPhone) this.setState({tempPhone:text})}}
        disableFullscreenUI={false}></TextInput>     
    </View>
    </TouchableOpacity>
    )
    else{
      return(
      <View style={{borderColor:'#000',borderWidth:3,width:'96%',borderRadius:5}}>
      <View style={styles.conPass}>
    <Text> </Text>
      <Icon name="lock" size={20}></Icon>
      <Text> Pre-Pass: </Text>
      <TextInput
        secureTextEntry={true}
        style={{height: 40, width: '65%'}}
        placeholder={'null'}
        editable={true}
        onChangeText={(text)=>{ if(this.state.onEditPhone) this.setState({tempPhone:text})}}
        disableFullscreenUI={false}></TextInput>     
    </View >
    <View style={styles.conPass}>
    <Text> </Text>
      <Icon name="unlock" size={20}></Icon>
      <Text> newPass: </Text>
      <TextInput
        secureTextEntry={true}
        style={{height: 40, width: '65%'}}
        placeholder={'null'}
        editable={true}
        onChangeText={(text)=>{ if(this.state.onEditPhone) this.setState({tempPhone:text})}}
        disableFullscreenUI={false}></TextInput>     
    </View>
    <View style={styles.conPass}>
    <Text> </Text>
      <Icon name="unlock-alt" size={20}></Icon>
      <Text> Re-newPass: </Text>
      <TextInput
        secureTextEntry={true}
        style={{height: 40, width: '65%'}}
        placeholder={'null'}
        editable={true}
        onChangeText={(text)=>{ if(this.state.onEditPhone) this.setState({tempPhone:text})}}
        disableFullscreenUI={false}></TextInput>     
    </View>

    <View>

      <Button title="Ok" style={{}}></Button>
      
      <Button title="Hủy" onPress={()=>{this.setState({onRePass:false})}}></Button>
    </View>

      </View>
      )
    }
  }

  _updatePhone()
  {
    FirebaseApp.database()
      .ref('User/' + FirebaseApp.auth().currentUser.uid)
      .set({
       // name: FirebaseApp.auth().currentUser.displayName,
        phone: this.state.tempPhone,      
      }).then(()=>{this.setState({tempPhone:'',onEditPhone:false})}).then(()=>{this._refeshPhone()})
  }

  _refeshPhone()
  {
    var phoneNumber='';
    FirebaseApp.database()
    .ref('User/' + FirebaseApp.auth().currentUser.uid+"/phone")
    .once('value',data=>{

      phoneNumber=data.val();
      this.setState({phoneNumber:phoneNumber})       
    })
  }

  _updateName()
  {
    FirebaseApp.auth().currentUser.updateProfile({displayName:this.state.tempName})
    .then(()=>{this.setState({onEditName:false,tempName:''});})
    .then(function() {
      // Profile updated successfully!
      // "Jane Q. User"
      
      

    }, function(error) {
        Alert.alert("Update name error")
      // An error happened.
    });
  }
_changePass()
{
 
  
}
  render() {
    console.log(this.state.temp);

    return (
      <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            margin: 10,
            flex: 1.2,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'red',
            width: '95%',
          }}>
          <Image style={styles.conAvatar} resizeMode={'cover'} source={{uri: FirebaseApp.auth().currentUser.photoURL}}></Image>
          <Text>Upload Avatar </Text>
        </View>

        <View
          style={{
            margin: 10,
            justifyContent: 'flex-start',
            flex: 2,
            width: '100%',
          }}>
          <View style={styles.conItem}>
            <Text> </Text>
            <Icon name="envelope" size={20}></Icon>
            <Text> E-mail: {FirebaseApp.auth().currentUser.email}</Text>
          </View>

          <View style={styles.conItem}>
          <Text> </Text>
            <Icon name="id-card" size={20}></Icon>
            <Text> Id User: {FirebaseApp.auth().currentUser.uid}</Text>
          </View>

          <View style={styles.conItem}>
          <Text> </Text>
            <Icon name="signature" size={20}></Icon>
            <Text> Name: </Text>
            <TextInput
              style={{height: 40, width: '65%'}}
              value={ this.state.onEditName==false? FirebaseApp.auth().currentUser.displayName: this.state.tempName}
              placeholder={'null'}
              editable={true}
              onChangeText={(text)=>{ if(this.state.onEditName) this.setState({tempName:text})}}
              disableFullscreenUI={false}></TextInput>
            {this._renderEdit('updateName')}
          </View>

          <View style={styles.conItem}>
          <Text> </Text>
            <Icon name="phone" size={20}></Icon>
            <Text> Phone: </Text>
            <TextInput
              style={{height: 40, width: '65%'}}
              value={ this.state.onEditPhone==false? this.state.phoneNumber: this.state.tempPhone}
              placeholder={'null'}
              editable={true}
              onChangeText={(text)=>{ if(this.state.onEditPhone) this.setState({tempPhone:text})}}
              disableFullscreenUI={false}></TextInput>

            {this._renderEdit('updatePhone')}
          </View>
          {this._renderRePass()}
        </View>
      </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {myCurrentSong: state.currentSong};
}

export default connect(mapStateToProps, {setSongPlay})(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  conAvatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#999',
    borderColor: '#456',
    borderWidth: 5,
  },
  conItem: {
    height: 40,
    flexDirection: 'row',
    width: '95%',
    borderColor: '#987',
    borderWidth: 1,
    borderRadius: 1,
    alignItems: 'center',
    margin: 2,
    alignContent: 'center',
  },
  conPass:{
    height: 40,
    flexDirection: 'row',
    width: '99%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 1,
    alignItems: 'center',
    margin: 2,
    alignContent: 'center',

  },

  input: {maxHeight: 40},
  inputContainer: {
    flex: 1,
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#c7c6c1',
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: '5%',
    width: '100%',
    justifyContent: 'flex-start',
  },
});
