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
//import {firebaseConfig} from "../components/FirebaseConfig"
import {GoogleSignin} from 'react-native-google-signin';
import { ScrollView } from 'react-native-gesture-handler';

//import * as Google from 'expo-google-app-auth';

export default class ForgotPassScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderSendCode: true,
      user: '',
      pass: '',
      rePass: '',
    };
  }
  componentDidMount() {
    //this._checkLoginnedIn();

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
      <View style={{flex:1,flexDirection: 'column',alignItems:'center',justifyContent:'flex-start',marginBottom:0}}>
        <TouchableOpacity
          onPress={() => {
            if (this.state.renderSendCode == true) {
              this._Login();
            } else {
              this.setState({renderSendCode: true});
              this._clearAll();
            }
          }}>
          <View style={this.state.renderSendCode==true? styles.conButon1:styles.conButon2}>
            <Text> Gửi yêu cầu đặt lại mật khẩu</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => {
            if (this.state.renderSendCode == false) {
              this._Register();
            } else {
              this.setState({renderSendCode: false});
              this._clearAll();
            }
          }}>
          <View style={this.state.renderSendCode==false? styles.conButon1:styles.conButon2}>
        <Text> {"Đặt lại mật khẩu"}</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
        <Text>---------------Quay lại đăng nhập---------------</Text>
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

    FirebaseApp.auth()
      .createUserWithEmailAndPassword(this.state.user, this.state.pass)
      .then(() => {
        Alert.alert('Đăng kí thành công!');
        this.setState({renderSendCode: true});
      })
      .catch(function(error) {
        // Handle Errors here.

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
      });
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

    FirebaseApp
      .auth()
      .sendPasswordResetEmail(this.state.user)
      .then(function() {
        Alert.alert("Đã gửi đặt lại mật khẩu đến email, kiểm tra email để đặt lại mật khẩu !! ");
      })
      .catch(function(error) {
       // Alert.alert(error.message);
       var  errorCode=error.code;
        console.log(error.message+"code: "+error.code)
        if (errorCode == 'auth/invalid-email') {
          Alert.alert('E-mail không hợp lệ');
          return;
        }

        
        if (errorCode == 'auth/user-not-found') {
          Alert.alert('E-mail này chưa đăng kí!');
          return;
        }

      });
      

    
    // FirebaseApp.auth()
    //   .signInWithEmailAndPassword(this.state.user, this.state.pass)
    //   .then(() => {
    //     this.props.navigation.navigate('Home');
    //   })
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     //.alert('Login failed!');
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorMessage + ' code: ' + errorCode);
    //     if (errorCode == 'auth/invalid-email') {
    //       Alert.alert('E-mail không hợp lệ');
    //       return;
    //     }
    //     if (errorCode == 'auth/wrong-password') {
    //       Alert.alert('Sai mật khẩu!');
    //       return;
    //     }
    //     // ...
    //   });
  }



  _renderRepass() {
    return (
      <View>
     
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
      </View>
    );
  }

  render() {
    return (
      
      <ImageBackground style={styles.container} source={require('../../res/BGStream1.jpg')}>

      <View style={styles.container}>
        <View style={{alignItems:'center',justifyContent:'flex-start',flex:1,marginTop:80}}>
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


        {this.state.renderSendCode == false ? this._renderRepass() : null}
     
          
       

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
      </View>
      </ImageBackground>
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#00a8ff',
    width: '100%',
    
  },
  conLogin: {flexDirection: 'row', justifyContent: 'center',borderWidth:2,backgroundColor:'#fff',borderRadius:25,marginTop:50},
  conInput: {
    width: 300,
    backgroundColor: '#FFF',
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
    borderColor: '#8395a7',
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
    borderColor: '#8395a7',
    marginBottom: 5,
    borderRadius: 25,
    margin: 3,
  },
});
