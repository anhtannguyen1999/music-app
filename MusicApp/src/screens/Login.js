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
  CheckBox,
} from 'react-native';
//import firebaseApp from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
import {Alert} from 'react-native';
import {FirebaseApp} from '../components/FirebaseConfig.js';
import firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
//import {firebaseConfig} from "../components/FirebaseConfig"
import { ScrollView } from 'react-native-gesture-handler';

//import * as Google from 'expo-google-app-auth';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderLogin: true,
      user: '',
      pass: '',
      rePass: '',
      spinner:true
    };
  }
  componentDidMount() {
    this._checkFileLocal();
    //this._checkLoginnedIn();
    FirebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user:FirebaseApp.auth().currentUser.email})

      /*  Alert.alert(
          'Chào mừng ' + (FirebaseApp.auth().currentUser.displayName==null?"":FirebaseApp.auth().currentUser.displayName ) + ' trở lại',
        );*/
        //this.props.navigation.navigate('Home');
      }
      this.setState({spinner:false})
    })
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
  _clearAll() {
    this.setState({user: '', pass: '', rePass: ''});
  }
  _renderButton() {
    return (
      <View style={{flex:1,flexDirection: 'column',alignItems:'center',justifyContent:'flex-end',marginBottom:10}}>
      <TouchableOpacity
        onPress={() => {
          if (this.state.renderLogin == true) {
            this._Login();
          } else {
            this.setState({renderLogin: true});
            this._clearAll();
          }
        }}>
        <View style={this.state.renderLogin==true? styles.conButon1:styles.conButon2}>
          <Text> Đăng nhập</Text>
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
        <View style={this.state.renderLogin==false? styles.conButon1:styles.conButon2}>
      <Text> {this.state.renderLogin==true? "Chưa có tài khoản?":"Đăng kí"}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ForgotPass')}}>
      <Text style={{color:"#FFF"}}>---------------Quên mật khẩu---------------</Text>
      </TouchableOpacity>
      
    </View>
    );
  }
  _Register() {
    // if(this.state.pass.length<6)
    // {
    //     Alert.alert("Pass must >6")
    //     //return;
    if (this.state.pass != this.state.rePass) {
      Alert.alert('2 mật khẩu phải giống nhau!');
      return;
    }
    this.setState({spinner:true})
    FirebaseApp.auth()
      .createUserWithEmailAndPassword(this.state.user, this.state.pass)
      .then(() => {
        this.setState({spinner:false})
        Alert.alert('Đăng kí thành công!');
        FirebaseApp.auth().currentUser.sendEmailVerification();
        this.setState({renderLogin: true});
      })
      .catch(function(error) {
        // Handle Errors here.
        //this.setState({spinner:false})
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage + ' code: ' + errorCode);
        if (errorCode == 'auth/email-already-in-use') {
          Alert.alert('E-mail này đã được đăng kí');
          return;
        }

        if (errorCode == 'auth/invalid-email') {
          Alert.alert('E-mail không hợp lệ!');
          return;
        }

        if (errorCode == 'auth/weak-password') {
          Alert.alert('Mật khẩu phải nhiều hơn 5 kí tự!');
          return;
        }

        // ...
      }).finally(()=>{this.setState({spinner:false})})
  }

  _Login() {
    // if (this.state.user == '') {
    //   Alert.alert('Email null');
    //   return;
    // }
    // if (this.state.pass.length < 6) {
    //   Alert.alert('Pass must >6');
    //   return;
    // }
    this.setState({spinner:true})
    FirebaseApp.auth()
      .signInWithEmailAndPassword(this.state.user, this.state.pass)
      .then(() => {
        this.setState({spinner:false})
        this.props.navigation.navigate('Home');
      })
      .catch(function(error) {
       // this.setState({spinner:false})
        // Handle Errors here.
        //.alert('Login failed!');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage + ' code: ' + errorCode);
        if (errorCode == 'auth/invalid-email') {
          Alert.alert('E-mail không hợp lệ');
          return;
        }
        if (errorCode == 'auth/wrong-password') {
          Alert.alert('Sai mật khẩu!');
          return;
        }
        // ...
      }).finally(()=>{this.setState({spinner:false})})
  }

  _LoginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    FirebaseApp.auth().languageCode = 'pt';
    provider.setCustomParameters({
      login_hint: 'user@example.com',
    });
    FirebaseApp.auth().signInWithPopup(provider);
  }

  _renderRepass() {
    return (
     

      <View style={styles.conLogin}>
        <Text>     </Text>
        <Icon name="lock" size={35} color="#000"></Icon>

        <Text> </Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.rePass}
          placeholder=" Nhập lại mật khẩu"
          style={styles.conInput}
          onChangeText={text => {
            this.setState({rePass: text});
          }}></TextInput>
      </View>
    );
  }

  render() {
    return (
      
      <ImageBackground source={require('../../res/BGStream1.jpg')}
      style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={{}}
        />
        <View style={{alignItems:'center',justifyContent:'flex-start',flex:1,marginTop:75}}>
        <Icon
          name="music"
          size={100}
          color={'#FFF'}
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <View style={styles.conLogin}>
        <Text>     </Text>
          <Icon name="envelope" size={40} color="#000"></Icon>

          <Text> </Text>
          <TextInput
            value={this.state.user}
            placeholder="  E-mail"
            style={styles.conInput}
            onChangeText={text => {
              this.setState({user: text});
            }}></TextInput>
        </View>

<Text style={{fontSize:3}}></Text>

        <View style={styles.conLogin}>
          <Text>     </Text>
          <Icon name="lock" size={35} color="#000"></Icon>

          <Text> </Text>
          <TextInput
            secureTextEntry={true}
            value={this.state.pass}
            placeholder=" Mật khẩu"
            style={styles.conInput}
            onChangeText={text => {
              this.setState({pass: text});
            }}></TextInput>
        </View>
        <Text style={{fontSize:3}}></Text>
        {this.state.renderLogin == false ? this._renderRepass() : null}
     
          <View style={{height:70}}></View>
       

        {this._renderButton()}
        </View>

        {/* <View style={{flexDirection: 'row'}}>
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
        </View> */}
      </ImageBackground>
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: '#00a8ff',
    width: '100%',
    
  },
  conLogin: {flexDirection: 'row', justifyContent: 'center',borderWidth:2,backgroundColor:'transparent',borderRadius:25},
  conInput: {
    width: 300,
    backgroundColor: 'transparent',
    marginBottom: 0,
    borderRadius: 30,
  },
  conButon1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6b81',
    width: 280,
    height:50,
    borderWidth: 2,
    borderColor: '#555',
    marginBottom: 5,
    borderRadius: 25,
    margin: 3,
  },
  conButon2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ced6e0',
    width: 130,
    height: 30,
    borderWidth: 2,
    borderColor: '#555',
    marginBottom: 5,
    borderRadius: 25,
    margin: 3,
  },
});
