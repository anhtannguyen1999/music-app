import React, { Component, cloneElement } from 'react';
import { StyleSheet, View, FlatList, Text, Button, TouchableOpacity, SafeAreaView, AsyncStorage,Image } from 'react-native';

import TrackPlayer from 'react-native-track-player';
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";

import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'rn-fetch-blob'
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { setSongPlay } from '../redux/action';
import Player from '../player/Player';
class ProfileScreen extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      temp: '',
      up: false
    };

  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
  //   var path = RNFetchBlob.fs.dirs.SDCardDir + '/Datalocal/Music_Local/testLyric.js'
  //   console.log(path);
 
  //   const { config, fs } = RNFetchBlob
  //  // let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
  //   let options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
  //       notification: true,
  //       title:'download',
  //      // path: PictureDir + "/me_" + Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
  //       path:path,
  //      description: 'Downloading music.'
  //     }
  //   }
  //   config(options).fetch('GET', 'https://static-zmp3.zadn.vn/lyrics/6/f/9/7/6f97fc3d7c394df24915e878b913d7bb.lrc').then((res) => {
  //     console.log("down load!")
      // do some magic here
    

  }




  render() {
    var tt = [
      {
        id: 1,
        value: "111"
      },
      {
        id: 2,
        value: "222"
      },
      {
        id: 3,
        value: "333"
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
    var p=RNFetchBlob.fs.dirs.SDCardDir+"/Download/thumbnail_medium.jpg"
    return (
      <View style={styles.autocompletesContainer}>
        <Image width={150} height={150} source={{p}}></Image>
        <Button title='Up' onPress={() => { this.setState({ up: true }) }}>
        </Button>
        <Modal isVisible={this.state.up} >
          <View style={{ backgroundColor: '#aaa', height: 300 }}>
            <Button title={'down'} onPress={() => { this.setState({ up: false }) }}></Button>
          </View>
        </Modal>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return { myCurrentSong: state.currentSong };
}

export default connect(mapStateToProps, { setSongPlay })(ProfileScreen);

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
    alignSelf: 'stretch'
  },
  input: { maxHeight: 40 },
  con1: {
    width: "100%",
    fontSize: 20,
    color: "#000",
  },
  con2: {
    width: "100%",
    fontSize: 20,
    color: "#f0f",
    color: "#F45"
  },

  input: { maxHeight: 40 },
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
