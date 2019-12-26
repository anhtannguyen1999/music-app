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
import firebase from 'firebase'
import ItemComment from '../components/ItemComment';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

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
      avatarSource:''
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    var t = new Date();
    console.log(FirebaseApp.auth().currentUser.displayName);
    this.setState({avatarSource:FirebaseApp.auth().currentUser.photoURL})
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
      ref={'currentPass'}
        secureTextEntry={true}
        style={{height: 40, width: '65%'}}
        placeholder={'null'}
        editable={true}
        onChangeText={(text)=>{ if(this.state.onRePass) this.setState({pass:text})}}
        disableFullscreenUI={false}></TextInput>     
    </View >
    <View style={styles.conPass}>
    <Text> </Text>
      <Icon name="unlock" size={20}></Icon>
      <Text> newPass: </Text>
      <TextInput
      ref={'newPass1'}
        secureTextEntry={true}
        style={{height: 40, width: '65%'}}
        placeholder={'null'}
        editable={true}
        onChangeText={(text)=>{ if(this.state.onRePass) this.setState({newPass:text})}}
        disableFullscreenUI={false}></TextInput>     
    </View>
    <View style={styles.conPass}>
    <Text> </Text>
      <Icon name="unlock-alt" size={20}></Icon>
      <Text> Re-newPass: </Text>
      <TextInput
      ref={'newPass2'}
        secureTextEntry={true}
        style={{height: 40, width: '65%'}}
        placeholder={'null'}
        editable={true}
        onChangeText={(text)=>{ if(this.state.onRePass) this.setState({re_newPass:text})}}
        disableFullscreenUI={false}></TextInput>     
    </View>

    <View>

      <Button title="Ok" onPress={()=>{this._changePassword(this.state.pass,this.state.newPass)}} style={{}}></Button>
      
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

_changePassword = (currentPassword, newPassword) => {
  if(this.state.newPass!=this.state.re_newPass)
  {
    Alert.alert("New pass must = Re new pass!!")
  }
  console.log(this.state.pass +"----"+this.state.newPass)
  this.reauthenticate(currentPassword).then(() => {
    var user = FirebaseApp.auth().currentUser;
    user.updatePassword(newPassword).then(() => {
      console.log("Password updated!");
      Alert.alert("Password updated!!");
      this.setState({pass:'',newPass:'',re_newPass:'',onRePass:false})
    }).catch((error) => { console.log("1"+error); Alert.alert("Password should be at least 6 characters")});
  }).catch((error) => { console.log("2"+error); Alert.alert("Curent Password invalid!!") });
}


reauthenticate = (currentPassword) => {
  var user = FirebaseApp.auth().currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
}

_sign_out()
{
  FirebaseApp.auth().signOut().then(function() {
    // Sign-out successful.
   // this._gotoLogin();
   
  }).catch(function(error) {
     console.log(error)
  });
  this.props.navigation.navigate('Login')
  
}
_upload()
{
  ImagePicker.showImagePicker(options, (response) => {
    //console.log('Response = ', response);
  
    if (response.didCancel) {
//console.log('User cancelled image picker');
    } else if (response.error) {
      //console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
     // console.log('User tapped custom button: ', response.customButton);
    } else {

     
      const source = { uri: response.uri };
      this.uploadImage(response.uri).then(url =>{FirebaseApp.auth().currentUser.updateProfile({photoURL:url}), this.setState({
        avatarSource: url,
      }),console.log(this.state.avatarSource)})
;
    }
  });
}

 uploadImage(uri, mime = 'image/jpeg', name) {
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;
  return new Promise((resolve, reject) => {
    let imgUri = uri; let uploadBlob = null;
    const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
    const { currentUser } = FirebaseApp.auth();
    const imageRef = FirebaseApp.storage().ref("images").child(`${currentUser.uid}.jpg`)

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime, name: name });
      })
      .then(() => {
        uploadBlob.close()
        //FirebaseApp.auth().currentUser.updateProfile({photoURL:imageRef.getDownloadURL()})
        console.log("link"+ imageRef.getDownloadURL())
        
        return imageRef.getDownloadURL();
        
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error)
    })
  })
}


_upImagetofirebase()
{

}
  render() {
 

    return (
      <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            margin: 10,
            flex: 1.2,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: "#999",
            borderRadius:5,
            width: '95%',
            padding:5
          }}>
            
          <Image style={styles.conAvatar} resizeMode={'cover'} source={{uri:this.state.avatarSource}}></Image>
          <Button title="Upload image" onPress={()=>{this._upload()}}></Button>
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
          <TouchableOpacity onPress={()=>{this._sign_out()}}>
          <View style={styles.conItem}>
           
              
            
          <Text> </Text>
            <Icon name="sign-out-alt" size={20}></Icon>
            <Text> Log out </Text> 
          </View>
          </TouchableOpacity>

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
    backgroundColor: '#81ecec',
    borderColor: '#0984e3',
    borderWidth: 5,
  },
  conItem: {
    height: 40,
    flexDirection: 'row',
    width: '95%',
    borderColor: '#987',
    backgroundColor:'#fff',
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
