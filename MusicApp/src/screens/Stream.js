import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';
import Player, {MyPlayerBar, MyLyric} from '../player/Player';
import play from '../../res/play_.png';
import pause from '../../res/pause_.png';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemComment from '../components/ItemComment';

import {connect} from 'react-redux';
import {setSongPlay} from '../redux/action';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import {FirebaseApp} from '../components/FirebaseConfig.js';
import {Alert} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
class StreamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      repeat: false,
      random: false,
      rerender: true,
      margindelay_: screenWidth / 2,
      toLeft: true,
      nameSong: '',
      rerender: 0,
      popUpCmt: false,
      dataCmt: [],
      valueCmt: '',
    };
    /* setInterval(() => {
      if (this.state.margindelay_ <= -screenWidth)
        this.setState({toLeft: false});
      if (this.state.margindelay_ >= screenWidth)
        this.setState({toLeft: true});

      if (this.state.toLeft) var temp = this.state.margindelay_ - 2;
      else {
        var temp = this.state.margindelay_ + 2;
      }
      this.setState({
        margindelay_: temp,
      });
    }, 35);*/
  }
  static navigationOptions = {
    header: null,
  };

  _setPause() {
    if (this.state.pause == true) {
      this.setState({pause: false});
      Player._setPlay();
    } else {
      this.setState({pause: true});
      Player._setPause();
    }
    console.log(this.state.pause);
  }

  _renderButtonPause() {
    if (this.state.pause == false)
      return <Icon name={'pause-circle-o'} size={70} color={'#fff'}></Icon>;
    else return <Icon name={'play-circle-o'} size={70} color={'#fff'}></Icon>;
  }

  _sendCmt() {
    let t= new Date()
    if (FirebaseApp.auth().currentUser == null) {
      Alert.alert('Login to comment');
      return;
    }
    if(FirebaseApp.auth().currentUser.displayName==null)
    {
      Alert.alert("Update profile to comment")
      return;
    }
    FirebaseApp.database()
      .ref('Comment/' + this.props.myCurrentSong.id)
      .push({
        name: FirebaseApp.auth().currentUser.displayName,
        cmt: this.state.valueCmt,
        time: t.getDate()+'/'+(t.getMonth()+1) +'/' +t.getFullYear()+ '---'+t.getHours()+':'+t.getMinutes(),
        uid: FirebaseApp.auth().currentUser.uid,
      });
      this.setState({valueCmt:''})
  }

  _loadDataCmt(idSong) {
    var items = [];
    FirebaseApp.database()
      .ref('Comment/' + idSong)
      .on('child_added', dataSnapshot => {
        // console.log(" data:  "+dataSnapshot.toJSON())
        items.push(dataSnapshot.val());
        this.setState({dataCmt: items});
        console.log(items);
      });
    // .then((data)=>{

    //   console.log(this.state.dataCmt['-LwdBMd51a0j-yf0cMTU'].name)
    // });
  }
  componentDidMount() {
    //this._loadDataCmt()
    this._loadDataCmt(this.props.myCurrentSong.id);
  }

  render() {
    var dataCmt = [
      {
        name: 'user1',
        time: '8/8/19 5:20',
        cmt: 'AAAAAAAAAAAA',
      },
      {
        name: 'user2',
        time: '8/9/19 10:20',
        cmt: 'momomommo',
      },
    ];
    return (
      <View style={styles.container}>
        <View style={styles.con2}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}>
            <View style={{flex: 1, width: screenWidth}} backgroundColor="#000">
              <View
                style={{
                  flex: 0.08,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: screenWidth,
                  height: 10,
                  marginLeft: 10,
                  backgroundColor: '#000',
                  width: screenWidth,
                }}>
                <Text style={{fontSize: 15, color: '#fff'}}>
                  Song:
                  {this.props.myCurrentSong.title}
                </Text>
                <Text style={{fontSize: 15, color: '#fff'}}>
                  Singer:
                  {this.props.myCurrentSong.artists_names}{' '}
                </Text>
              </View>
            </View>

            <View style={{flex: 1, width: screenWidth}} backgroundColor="#321">
              <MyLyric linkLyric={this.props.myCurrentSong.lyric}> </MyLyric>
            </View>
          </ScrollView>
        </View>

        <View style={{}}>
          <Button
            title="Comment"
            onPress={() => {
              this._loadDataCmt(this.props.myCurrentSong.id);
              this.setState({popUpCmt: true});
            }}></Button>
        </View>
        <View style={styles.con1}>
          <MyPlayerBar></MyPlayerBar>

          <View style={styles.containerButton}>
            <View flex={1}>
              <TouchableOpacity flex={1}>
                <Image
                  resizeMode="center"
                  source={
                    this.props.pause
                      ? require('../../res/shuffle.png')
                      : require('../../res/shuffle.png')
                  }></Image>
              </TouchableOpacity>
            </View>

            <View style={{flex: 2.5, flexDirection: 'row'}}>
              <Text style={{fontSize: 20}}> </Text>
              <TouchableOpacity>
                <Image
                  resizeMode="center"
                  source={require('../../res/prev.png')}></Image>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this._setPause();
                }}>
                {this._renderButtonPause()}
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  resizeMode="center"
                  source={require('../../res/next.png')}></Image>
              </TouchableOpacity>
            </View>

            <View flex={1}>
              <TouchableOpacity>
                <Image
                  resizeMode="center"
                  source={require('../../res/repeat.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Modal
            visible={this.state.popUpCmt}
            transparent={true}
            animationType="slide"
            onBackdropPress={() => {
              this.setState({popUpCmt: false});
            }}>
            <View
              style={{
                padding: 20,
                borderRadius: 20,
                marginTop: -50,
                height: 550,
                width: 350,
                backgroundColor: '#ffcccc',
                //justifyContent: 'center',
              }}>
              <Button title={this.props.myCurrentSong.title}></Button>
              <Text></Text>
              <View
                style={{
                  flex: 7,
                  backgroundColor: '#fff',
                  marginBottom: 10,
                  borderRadius: 10,
                }}>
                {}
                <FlatList
                  data={this.state.dataCmt}
                  extraData={this.state.dataCmt}
                  renderItem={({item, index}) => (
                    <ItemComment
                      urlImage={item.image}
                      name={item.name}
                      time={item.time}
                      cmt={item.cmt}></ItemComment>
                  )}></FlatList>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', marginLeft: 0}}>
                  <TextInput
                   value={this.state.valueCmt}
                    onChangeText={text => {
                      this.setState({valueCmt: text});
                    }}
                    style={{
                      backgroundColor: '#FFFF',
                      width: 260,
                      height: 35,
                      borderRadius: 5,
                    }}></TextInput>
                  <TouchableOpacity
                    onPress={() => {
                      this._sendCmt();
                    }}>
                    <Icon name="send" size={25} color="#81ecec"></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {myCurrentSong: state.currentSong};
}
export default connect(mapStateToProps, {setSongPlay})(StreamScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  con1: {
    flex: 1.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  con2: {
    width: screenWidth,
    flex: 5,
  },

  containerButton: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#054',
    flexDirection: 'row',
    width: screenWidth,
  },
  containerProc: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: screenWidth,
  },
});
