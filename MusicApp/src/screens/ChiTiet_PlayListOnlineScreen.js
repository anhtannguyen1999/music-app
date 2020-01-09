import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Dimensions} from 'react-native';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
const screenWidth = Math.round(Dimensions.get('window').width);
import Player, {MyPlayerBar} from '../player/Player';
import PlayList from '../components/PlayList';
import DanhSachBaiHat from '../components/DanhSachBaiHat'

import {connect} from 'react-redux';
import {setSongPlay, setPlayListOnline,setDataDanhSachDangNghe,playInIndex} from '../redux/action';

class ChiTiet_PlayListOnlineScreen extends Component {
  constructor(props) {
    super(props);
    console.log('Constructor');
    this.state = {};
  }
  static navigationOptions = {
    title: 'Chi tiết PlayList',
  };

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <View style={styles.container}>
        <View
          style={
            (styles.container,
            {margin: 0, marginLeft: 0, borderWidh: 2, borderColor: '#000'})
          }>
          <View style={{flexDirection: 'row'}}>
            <Image
              loadingIndicatorSource={require('../../res/m_musicicon.png')}
              style={styles.imageStyle}
              source={{
                uri: this.props.navigation.getParam('thumbnail_medium', 0),
              }}
              onError={e => {}}></Image>
            <View>
            <Text style={{fontSize: 17,maxWidth:200,fontWeight:'bold'}}>
                {this.props.myPlayListOnline.dataSong.title}
              </Text>
              <Text style={{fontSize: 15}}>
                {parseInt(this.props.navigation.getParam('numberSong', 0))} bài
              </Text>
              {/* <Text style={{fontSize: 15}}>
                {'Lượt nghe: '+this.props.getParam()}
                {}
              </Text> */}
            </View>
          </View>
        </View>
        <View style={styles.container1}>
          {/*<Text style={styles.tieuDe}> Danh sach bai hat:</Text>*/}
          <View style={{ alignItems: 'flex-start', width: '89%' }}>
            {/* <Button title="Nghe tất cả" onPress={() => {
              //Player.AddPlayingList();
              Player.ClearPlayingList();
              this.props.setDataDanhSachDangNghe('DSDN',this.props.myPlayListOnline.dataSong.song.items);
              this.props.myPlayListOnline.dataSong.song.items.forEach(element => {
                Player.AddASongToPlayingList(
                  element.id,
                  'http://api.mp3.zing.vn/api/streaming/audio/' + element.id + '/128',
                  element.title,
                  element.artists_names,
                  element.thumbnail_medium,
                  element.duration,
                  element.lyric,
                );
                //console.log("Them " + element.title);
              });
             // this.props.playInIndex(1,'1',this.props.myPlayListOnline.dataSong.song.items);
              Player.PlayMusicAtIndex(1);
            }}></Button>
           */}
          </View>

            <DanhSachBaiHat 
            kind={this.props.myPlayListOnline.id}
            dataDanhSachBaiHat={this.props.myPlayListOnline.dataSong.song.items}></DanhSachBaiHat>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {myPlayListOnline: state.currentPlayListOnline};
}

export default connect(mapStateToProps, {setSongPlay,setDataDanhSachDangNghe,playInIndex})(ChiTiet_PlayListOnlineScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  container1: {
    flex: 2,
    width: screenWidth * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    margin: 10,
    borderRadius: 10,
  },
  tieuDe: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
    fontFamily: 'vincHand',
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 3,
    marginBottom: 3,
    color: '#000',
  },
  danhsach: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
    fontFamily: 'vincHand',
    fontWeight: 'bold',
    marginTop: 0,
    marginLeft: 3,
    marginBottom: 3,
    color: '#000',
  },
  imageStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 135,
    height: 135,
    margin: 3,
    padding: 0,
    resizeMode: 'center',
    borderRadius: 3,
    borderColor: '#000',
    borderWidth: 2,
  },
});
