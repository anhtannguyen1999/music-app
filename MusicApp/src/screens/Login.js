import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
//import firebaseApp from 'firebase'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';
import {Alert} from 'react-native';
import {FirebaseApp} from '../components/FirebaseConfig.js'
import  firebase from 'firebase';
//import {firebaseConfig} from "../components/FirebaseConfig"
import {GoogleSignin } from 'react-native-google-signin'

//import * as Google from 'expo-google-app-auth';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderLogin: true,
      user: '',
      pass: '',
      rePass: '',
    };
  }
  componentDidMount() {
    this._checkFileLocal();
   // this._checkLoginnedIn();


  }
  _checkFileLocal() {
    var fs = RNFetchBlob.fs;
    var path = RNFetchBlob.fs.dirs.SDCardDir + '/DataLocal';
    RNFetchBlob.fs.exists(path).then(value => {
      if (!value) {
        fs.mkdir(path)
          .then(() => {
            fs.mkdir(path + '/PlayList_Local');
            fs.mkdir(path + '/BaiHatVuaNghe');
            fs.mkdir(path + '/Music_Local').then(() => {
              fs.mkdir(path + '/Music_Local/DataMusicLocal');
            });
          })
          .then(() => {
            let objMusicLocalManager = {total_song: 0, items: []};
            fs.createFile(
              path + '/Music_Local/MusicLocalManager.js',
              JSON.stringify(objMusicLocalManager),
              'utf8',
            );

            let objPlayList_Local = {total_list: 0, list: []};
            fs.createFile(
              path + '/PlayList_Local/PlayListManager.js',
              JSON.stringify(objPlayList_Local),
              'utf8',
            );

            let objBHVuaNghe = {items: []};
            fs.createFile(
              path + '/BaiHatVuaNghe/BaiHatVuaNghe.js',
              JSON.stringify(objBHVuaNghe),
              'utf8',
            );
          });
      }
    });
  }
  _checkLoginnedIn(){
    FirebaseApp.auth().onAuthStateChanged(function(user){
      if(user)
      {
        Alert.alert("dang nhap roi ")
        this.props.navigation.navigate('Home')
        
      }
      else
      {
        Alert.alert('Chua dang nhap');
      }
    })
  };

  async signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '434328547654-9qtq1lvss50bfbirebl9l4799eikkbtf.apps.googleusercontent.com',
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }


  
  _clearAll() {
    this.setState({user: '', pass: '', rePass: ''});
  }
  _renderButton()
  {
    return(
      
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.renderLogin == true) {
                      this._Login();
                  } else {
                    this.setState({renderLogin: true});
                    this._clearAll();
                  }
                }}>
                <View style={styles.conButon}>
                  <Text> Login</Text>
                </View>
              </TouchableOpacity>
    
              <TouchableOpacity
                onPress={() => {
                    if (this.state.renderLogin == false) {
                        this._Register();
                    } else {
                      this.setState({renderLogin: false});
                      this._clearAll();
                    }
                }}>
                <View style={styles.conButon}>
                  <Text> Register</Text>
                </View>
              </TouchableOpacity>
            </View>
          
    )
  }
  _Register()
  {
      if(this.state.user=="")
      {
          Alert.alert("Email null");
          return;
      }
      if(this.state.pass.length<6)
      {
          Alert.alert("Pass must >6")
          return;
      }
      if(this.state.pass!=this.state.rePass)
      {
          Alert.alert("RePass != Pass")
          return;
      }

      FirebaseApp.auth().createUserWithEmailAndPassword(this.state.user, this.state.pass)
      .then( ()=>{
          Alert.alert("Dang ki thanh cong")
          this.setState({renderLogin:true})
      })
      .catch(function(error) {
        // Handle Errors here.
        Alert.alert("Dang ki that bai")
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  _Login()
  {
    if(this.state.user=="")
    {
        Alert.alert("Email null");
        return
    }
    if(this.state.pass.length<6)
    {
        Alert.alert("Pass must >6")
        return
    }
    FirebaseApp.auth().signInWithEmailAndPassword(this.state.user,this.state.pass)
    .then(()=>{this.props.navigation.navigate('Home')})
    .catch(function(error) {
        // Handle Errors here.
        Alert.alert("Login failed!")
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      
  }


  
  _LoginWithGoogle()
  {
    
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    FirebaseApp.auth().languageCode = 'pt';  
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    FirebaseApp.auth().signInWithPopup(provider);
  }



  

  _renderRepass()
  {
    return(
        <TextInput
        secureTextEntry={true}
        value={this.state.rePass}
        placeholder="  Re-pass"
        style={styles.conInput}
        onChangeText={text => {
          this.setState({rePass: text});
        }}></TextInput>
    )
  }

  render() {
    
    return (
      <SafeAreaView style={styles.container}>
        <Icon
          name="music"
          size={100}
          color={'#FFF'}
          onPress={() => this.props.navigation.navigate('Home')}
        />
        
        <TextInput
            value={this.state.user}
          placeholder="  E-mail"
          style={styles.conInput}
          onChangeText={text => {
            this.setState({user: text});
          }}></TextInput>

        <TextInput
        secureTextEntry={true}
        value={this.state.pass}
          placeholder="  PassWord"
          style={styles.conInput}
          onChangeText={text => {
            this.setState({pass: text});
          }}></TextInput>

        {this.state.renderLogin==false? this._renderRepass():null}

        {this._renderButton()}


        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this._ll()}>
            <View style={styles.conLogin}>
              <Icon name="google-plus-box" size={40}></Icon>
              <Text> Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.conLogin}>
              <Icon name="facebook-box" size={40}></Icon>
              <Text> Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>


      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b8e994',
    width: '100%',
    height: '120%',
  },
  conLogin: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffda79',
    width: 150,
    borderWidth: 2,
    borderColor: '#555',
    marginBottom: 5,
    borderRadius: 5,
  },
  conInput: {
    width: 250,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 10,
  },
  conButon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffda79',
    width: 100,
    height: 30,
    borderWidth: 2,
    borderColor: '#555',
    marginBottom: 5,
    borderRadius: 5,
    margin: 3,
  },
});
