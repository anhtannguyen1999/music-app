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
  Switch,
  Slider,
  ImageBackground,
  Share,
  Linking
} from 'react-native';
import Player, {MyLyric, MyPlayerBar} from '../player/Player';
import ReLoadSong from '../components/MyPlayerBar';
import Modal from 'react-native-modal';
import Icon_ from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemComment from '../components/ItemComment';
//import Slider from 'react-native-slider';
//import { FlatList } from 'react-native-gesture-handler';
import DanhSachBaiHat from '../components/DanhSachBaiHat';

import {connect} from 'react-redux';
import {
  setSongPlay,
  setPause,
  setPlay,
  setIndexPlayingInList,
} from '../redux/action';
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
      popUpClock: false,
      clock_On: false,
      timerValue: 0,
      popUpSpeed: false,
      speedValue: 1,
      typeLoop: 0,
      typeNext: 0,
    };
  }
  static navigationOptions = {
    header: null,
  };

  _setPause() {
    if (this.props.isPause == true) {
      //this.setState({pause: false});
      this.props.setPause();
      Player._setPause();
    } else {
      //this.setState({pause: true});
      this.props.setPlay();
      Player._setPlay();
    }
    console.log(this.state.pause);
  }

  _renderButtonPause() {
    if (this.props.isPause == true)
      return <Icon name={'pause-circle-o'} size={70} color={'#fff'}></Icon>;
    else return <Icon name={'play-circle-o'} size={70} color={'#fff'}></Icon>;
  }

  _sendCmt() {
    let t = new Date();
    if (FirebaseApp.auth().currentUser == null) {
      Alert.alert('Login to comment');
      return;
    }
    if (FirebaseApp.auth().currentUser.displayName == null) {
      Alert.alert('Update profile to comment');
      return;
    }
    FirebaseApp.database()
      .ref('Comment/' + this.props.myCurrentSong.id)
      .push({
        name: FirebaseApp.auth().currentUser.displayName,
        cmt: this.state.valueCmt,
        time:
          t.getDate() +
          '/' +
          (t.getMonth() + 1) +
          '/' +
          t.getFullYear() +
          '---' +
          t.getHours() +
          ':' +
          t.getMinutes(),
        uid: FirebaseApp.auth().currentUser.uid,
      });
    this.setState({valueCmt: ''});
  }

  _loadDataCmt(idSong) {
    if (idSong == null) return;
    var items = [];
    FirebaseApp.database()
      .ref('Comment/' + idSong)
      .on('child_added', dataSnapshot => {
        // console.log(dataSnapshot.toJSON())

        FirebaseApp.storage()
          .ref('/images/' + dataSnapshot.val().uid + '.jpg')
          .getDownloadURL()
          .then(url => {
            var t = dataSnapshot.toJSON();
            t.image = url;
            items.push(t);
            //console.log(items);
          })
          .then(() => {
            this.setState({dataCmt: items});
          });

        //this.setState({dataCmt: items});
      });
    // .then((data)=>{

    //   console.log(this.state.dataCmt['-LwdBMd51a0j-yf0cMTU'].name)
    // });
  }
  componentDidMount() {
    //this._loadDataCmt()
    //this._loadDataCmt(this.props.myCurrentSong.id);
  }

  static _on = false;
  ShowAlertWithDelay = () => {
    setTimeout(function() {
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.

      //this.setState({clock_On:false})

      StreamScreen._on = true;
      Player._setPause();
      Alert.alert('Đã tắt');
    }, this.state.timerValue * 1000);
  };

  openLink()
  {
    var name=(this.change_alias(this.props.myCurrentSong.title))
    var art=(this.change_alias(this.props.myCurrentSong.artists_names))
   var url="https://zingmp3.vn/bai-hat/"+name+"-"+art+"/"+this.props.myCurrentSong.id+".html"
   Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " +url);
    }
  });

  }


  _shareSong() {
    var name=(this.change_alias(this.props.myCurrentSong.title))
    var art=(this.change_alias(this.props.myCurrentSong.artists_names))
   var link="https://zingmp3.vn/bai-hat/"+name+"-"+art+"/"+this.props.myCurrentSong.id+".html"
    console.log();
    Share.share({
      message: this.props.myCurrentSong.title+" "+ link,
      url: link,
      title: 'Wow, did you see that?'
    }, {
      // Android only:
      dialogTitle: 'Share '+this.props.myCurrentSong.title,
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }

   change_alias(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/,/g, "");
    str = str.replace(/ /g, "-");
    return str;
}

  //   componentWillReceiveProps(nextProps) {
  //     if(nextProps.hasClock != this.props.hasClock){
  //         this.setState({
  //             showWarning:nextProps.hasClock
  //         });
  //         setTimeout(()=> {
  //             this.setState({
  //                 showWarning:!this.props.showWarning
  //             });
  //         }, this.state.timerValue*1000);
  //     }
  // }

  render() {
    if (StreamScreen._on == true) {
      this.setState({clock_On: false, timerValue: 0});
      this.props.setPause();
      StreamScreen._on = false;
    }
    return (
      <ImageBackground
        source={require('../../res/BGStream1.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={[styles.container, {backgroundColor: 'transparent'}]}>
          <View style={[styles.con2, {position: 'relative'}]}>
            {/*Ten bai hat  */}
            <View
              style={{
                backgroundColor: '#0abde395',
                zIndex: 9,
                flexDirection: 'row',
              }}>
              <View style={[styles.con2, {position: 'relative'}]}>
                <Text
                  style={{fontSize: 15, color: '#341f97', textAlign: 'center'}}>
                  ♪{this.props.myCurrentSong.title}♫
                </Text>
                <Text
                  style={{fontSize: 15, color: '#341f97', textAlign: 'center'}}>
                  - {this.props.myCurrentSong.artists_names} -
                </Text>
              </View>

              <View style={{justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({popUpClock: !this.state.popUpClock});
                  }}>
                  <Icon_ name="clock" size={20} color={'#fff'}></Icon_>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={true}>
              {/* Man hinh loi */}
              <View
                style={{flex: 1, width: screenWidth}}
                backgroundColor="transparent">
                <MyLyric linkLyric={this.props.myCurrentSong.lyric}> </MyLyric>
              </View>

              {/*Man hinh khac  */}
              <View
                style={{
                  flex: 1,
                  width: screenWidth,
                  backgroundColor: 'transparent',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: screenWidth,
                    marginLeft: 10,
                    width: screenWidth,

                    zIndex: 9,
                  }}>
                  <DanhSachBaiHat
                    kind={'BHDN'}
                    canRemove={false}
                    dataDanhSachBaiHat={
                      this.props.dataDanhSachDangNghe.dataSong
                    }
                    isTrongSuot="true"></DanhSachBaiHat>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Phan thanh player */}
          <View style={[styles.con1, {backgroundColor: 'transparent'}]}>
            <View style={{flexDirection: 'row',margin:3}}>
              {/* <Button
            title="Comment"
            onPress={() => {
              this._loadDataCmt(this.props.myCurrentSong.id);
              this.setState({popUpCmt: true});
            }}></Button> */}
              <View style={{margin: 3, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    this._loadDataCmt(this.props.myCurrentSong.id);
                    this.setState({popUpCmt: true});
                  }}>
                  <Icon_ name="comment-alt" color="#FFF" size={25}></Icon_>
                </TouchableOpacity>
                {/* <Text style={{color:"#FFF"}}>Comment</Text> */}
              </View>

              <View style={{margin: 3, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({popUpSpeed: true});
                  }}>
                  <Icon_ name="tachometer-alt" color="#FFF" size={25}></Icon_>
                </TouchableOpacity>
                {/* <Text style={{color:"#FFF"}}>Speed</Text> */}
              </View>

              <View style={{margin: 3, alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {}}>
                  <Icon_ name="list-alt" color="#FFF" size={25}></Icon_>
                </TouchableOpacity>
                {/* <Text style={{color:"#FFF"}}>List song</Text> */}
              </View>

              <View style={{margin: 3, alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {this._shareSong()}}>
                  <Icon_ name="share-alt-square" color="#FFF" size={25}></Icon_>
                </TouchableOpacity>
                {/* <Text style={{color:"#FFF"}}>Share</Text> */}
              </View>

              <View style={{margin: 3, alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {this.openLink()}}>
                  <Icon_ name="info-circle" color="#FFF" size={25}></Icon_>
                </TouchableOpacity>
                {/* <Text style={{color:"#FFF"}}>Infomation</Text> */}
              </View>
            </View>
           
            <ReLoadSong index={this.props.indexPlayingInList}></ReLoadSong>
            
              <MyPlayerBar></MyPlayerBar>
            

            <View
              style={[styles.containerButton, {backgroundColor: 'transparent'}]}>
              <View flex={1}>
                <TouchableOpacity
                  flex={1}
                  onPress={() => {
                    Player.NextTypeNext();
                    this.setState({typeNext: Player.typeNext});
                  }}>
                  <Image
                    style={{height: '100%'}}
                    resizeMode="center"
                    source={
                      this.state.typeNext == 0
                        ? require('../../res/shuffle.png')
                        : require('../../res/shuffle_selected.png')
                    }></Image>
                </TouchableOpacity>
              </View>

              <View flex={1}>
                <TouchableOpacity
                  flex={1}
                  onPress={() => {
                    Player.PlayPre();
                    Player._setPlay();
                  }}>
                  <Image
                    style={{height: '83%', marginTop: 5, marginBottom: 5}}
                    resizeMode="center"
                    source={require('../../res/prev.png')}></Image>
                </TouchableOpacity>
              </View>

              <View flex={1}>
                <TouchableOpacity
                  onPress={() => {
                    this._setPause();
                  }}>
                  {this._renderButtonPause()}
                </TouchableOpacity>
              </View>

              <View flex={1}>
                <TouchableOpacity
                  onPress={() => {
                    Player.PlayNext();
                    Player._setPlay();
                  }}>
                  <Image
                    style={{height: '83%', marginTop: 5, marginBottom: 5}}
                    resizeMode="center"
                    source={require('../../res/next.png')}></Image>
                </TouchableOpacity>
              </View>

              <View flex={1}>
                <TouchableOpacity
                  onPress={() => {
                    Player.NextTypeLoop();
                    this.setState({typeLoop: Player.typeLoop});
                  }}>
                  <Image
                    style={{height: '100%'}}
                    resizeMode="center"
                    source={
                      this.state.typeLoop == 0
                        ? require('../../res/repeat.png')
                        : this.state.typeLoop == 1
                        ? require('../../res/repeat_all.png')
                        : require('../../res/repeat_one.png')
                    }></Image>
                </TouchableOpacity>
              </View>
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

          <Modal
            visible={this.state.popUpClock}
            transparent={true}
            animationType="slide"
            style={{alignItems: 'center'}}
            onBackdropPress={() => {
              this.setState({popUpClock: false});
            }}>
            <View
              style={{
                padding: 20,
                borderRadius: 20,
                // marginTop: -50,
                height: 150,
                width: 150,
                backgroundColor: '#ffcccc',
                alignItems: 'center',
                //justifyContent: 'center',
              }}>
              <Button title={'Hẹn giờ'}></Button>
              <Text></Text>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', marginLeft: 0}}>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={3}
                    value={this.state.timerValue}
                    onChangeText={text => {
                      this.setState({timerValue: text});
                    }}
                    style={{
                      backgroundColor: '#FFFF',
                      width: 80,
                      height: 35,
                      borderRadius: 5,
                    }}></TextInput>

                  {/* <Button title={this.state.clock_On==false? 'Tắt':"Bật"} onPress={()=>{this.setState({clock_On:!this.state.clock_On});
                  if(this.state.clock_On)
                  {
                    this.ShowAlertWithDelay();
                  }
                }}></Button> */}

                  {/* <TouchableOpacity
                    onPress={() => {
                      this._sendCmt();
                    }}>
                    <Icon name="send" size={25} color="#81ecec"></Icon>
                  </TouchableOpacity> */}
                </View>
                <Switch
                  value={this.state.clock_On}
                  onTouchEnd={() => {
                    this.setState({clock_On: !this.state.clock_On});
                    if (!this.state.clock_On && this.state.timerValue != 0) {
                      this.ShowAlertWithDelay();
                    }
                  }}></Switch>
                {/* <Text>Báo thức đang: {this.state.clock_On==false? 'Tắt':"Bật"} </Text> */}
              </View>
            </View>
          </Modal>

          <Modal
            visible={this.state.popUpSpeed}
            transparent={true}
            animationType="slide"
            style={{alignItems: 'center'}}
            onBackdropPress={() => {
              this.setState({popUpSpeed: false});
            }}>
            <View
              style={{
                padding: 20,
                borderRadius: 20,
                // marginTop: -50,
                height: 150,
                width: 250,
                backgroundColor: '#ffcccc',
                alignItems: 'center',
                //justifyContent: 'center',
              }}>
              <Button title={'Speed'}></Button>
              <Text></Text>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', marginLeft: 0}}>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={4}
                    editable={false}
                    value={this.state.speedValue.toString()}
                    style={{
                      backgroundColor: '#FFFF',
                      width: 35,
                      height: 35,
                      borderRadius: 5,
                    }}></TextInput>
                  <Slider
                    width={200}
                    marginBottom={0}
                    maximumValue={2}
                    minimumValue={0.25}
                    step={0.25}
                    value={this.state.speedValue}
                    onSlidingComplete={value => {
                      Player._setRate(value);
                      this.setState({speedValue: value});
                    }}></Slider>
                </View>
                {/* <Switch
                  value={this.state.clock_On}
                  onTouchEnd={() => {
                    this.setState({clock_On: !this.state.clock_On});
                    if (!this.state.clock_On && this.state.timerValue != 0) {
                      this.ShowAlertWithDelay();
                    }
                  }}></Switch> */}
                {/* <Text>Báo thức đang: {this.state.clock_On==false? 'Tắt':"Bật"} </Text> */}
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    myCurrentSong: state.currentSong,
    isPause: state.isPause,
    dataDanhSachDangNghe: state.dataDanhSachDangNghe,
    indexPlayingInList: state.indexPlayingInList,
  };
}
export default connect(mapStateToProps, {
  setSongPlay,
  setPause,
  setPlay,
  setIndexPlayingInList,
})(StreamScreen);
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: screenWidth,
    marginBottom: 20,
    marginTop:15
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
