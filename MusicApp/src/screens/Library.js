import React, { Component, cloneElement } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import { test } from './test';

import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Entypo';
import PlayList from '../components/PlayList';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
import RNFetchBlob from 'rn-fetch-blob';

import { connect } from 'react-redux';
import {
  setSongPlay,
  setPlayListOnline,
  setPlayListOffline,
  setDataAllPlayList,
  setDataMusicLocal
} from '../redux/action';
import DanhSachBaiHat from '../components/DanhSachBaiHat';
import { ScrollView } from 'react-native-gesture-handler';
class LibraryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataPlayList: [],
      isRenderAdd: false,
      namePlayListAdd: '',
      rerender: 0
    };
  }
  static navigationOptions = {
    header: null,
  };

  _renderAvatarPlayList(id, thumbnail_medium, title, total_song) {
    return (
      <TouchableOpacity
        onPress={() => {
          this._loadDataSongInPlayListOffline(id),

            this.props.navigation.navigate('ChiTiet_PlayListOffline', {
              id: id,
              thumbnail_medium: thumbnail_medium,
              title: title,
              numberSong: total_song,
            });
            //this._loadDataSongInPlayListOffline(id)
        }}>
        <PlayList
          linkImagePlayList={thumbnail_medium}
          title={title}
          numberSong={total_song}>
          {' '}
        </PlayList>
      </TouchableOpacity>
    );
  }
  componentDidMount() {
    this._loadLocalPlayList();
    this._loadDataMusicLocal()
    //this._addPlayList();
    //this._loadDataSongInPlayListOffline(0);
  }
  _renderAddPlayList() {
    return (
      <View
        style={{
          width: '100%',
          margin: 0,
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: '#000',
        }}>
        <View style={{ padding: 20 }}>
          <Text> Tên Playlist bạn muốn tạo:</Text>
          <TextInput
            style={{
              backgroundColor: '#eee',
              margin: 10,
              width: '90%',
              borderRadius: 10,
            }} onChangeText={(text) => this.setState({ namePlayListAdd: text })}></TextInput>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginRight: 25,
            }}>
            <Button title={'Tạo'} onPress={() => { this._addPlayList(), this.setState({ isRenderAdd: false }) }}></Button>
            <Text> </Text>
            <Button
              title={'Hủy'}
              onPress={() => {
                this.setState({ isRenderAdd: false });
              }}></Button>
          </View>
        </View>
      </View>
    );
  }

  _loadLocalPlayList() {
    const dirs = RNFetchBlob.fs.dirs;
    const fs = RNFetchBlob.fs;
    var PATH = dirs.SDCardDir + '/DataLocal/PlayList_Local/PlayListManager.js';
    //var PATH=dirs.SDCardDir+'/DataLocal/PlayList_Local/qq.js'
    RNFetchBlob.fs
      .readFile(PATH, 'utf8')

      .then(data => {
        //this.setState({dataPlayList: JSON.parse(data)});
        this.props.setDataAllPlayList(JSON.parse(data));

        //console.log(this.state.dataPlayList.list[0].song.items)
      });
  }

  _loadDataSongInPlayListOffline(id) {
    this.props.setPlayListOffline(
      id,
      this.props.dataAllPlaylist.list[parseInt(id)].song.items,
    );
    //console.log(LibraryScreen.dataTest[0].song.items)
    //console.log(this.props.myPlayList.dataSong)
  }

  _addPlayList() {
    if (this.state.namePlayListAdd == '')
      return;
    var PATH = RNFetchBlob.fs.dirs.SDCardDir + '/DataLocal/PlayList_Local/PlayListManager.js';
    var temp = this.props.dataAllPlaylist;
    var lastIndex = temp.total_list;
    var obj = { "id": lastIndex.toString(), "title": this.state.namePlayListAdd, "thumbnail_medium": "http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/music-icon.png", "total_song": 0, "song": { "items": [] } }
    temp.list.push(obj);
    temp.total_list++;
    this.props.setDataAllPlayList(temp);
    RNFetchBlob.fs.writeFile(PATH, JSON.stringify(temp))

    //console.log(temp)

    // this.setState({dataPlayList:temp})
  }
  _loadDataMusicLocal()
  {
    var path=RNFetchBlob.fs.dirs.SDCardDir+ "/DataLocal/Music_Local/MusicLocalManager.js"
    var temp=[];
    RNFetchBlob.fs.readFile(path,'utf8').then((data)=>{
      temp=JSON.parse(data)
      this.props.setDataMusicLocal(temp);
    })
  }
  static dataTest = {
    total_list: 2,
    list: [
      {
        id: '0',
        title: 'PlayList Test 0',
        thumbnail_medium:
          'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/music-icon.png',
        total_song: 2,
        song: {
          items: [
            {
              id: 'ZWAFE897',
              title: 'Bánh Mì Không',
              artists_names: 'Đạt G, DuUyen',
              thumbnail_medium:
                'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/2/9/0/6/2906681d4b764cd4677342b66813f25d.jpg',
              lyric:
                'https://static-zmp3.zadn.vn/lyrics/6/f/9/7/6f97fc3d7c394df24915e878b913d7bb.lrc',
              duration: 245,
            },
            {
              id: 'ZWAFE89B',
              title: 'Em Một Mình Quen Rồi',
              artists_names: 'Dương Hoàng Yến',
              thumbnail_medium:
                'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/7/b/e/9/7be9788129f81d9c3d685969db8ab70a.jpg',
              lyric:
                'https://static-zmp3.zadn.vn/lyrics/1/d/9/5/1d959ad872a0842198836792214b3bd5.lrc',
              duration: 358,
            },
          ],
        },
      },

      {
        id: '1',
        title: 'PlayList Test 1',
        thumbnail_medium:
          'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/music-icon.png',
        total_song: 2,
        song: {
          items: [
            {
              id: 'ZWAFEWOU',
              title: 'Sao Chẳng Phải Là Anh',
              artists_names: 'Chi Dân',
              thumbnail_medium:
                'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/9/9/e/999e7aa9d6d42e60d3b2f28072a0c968.jpg',
              lyric:
                'https://static-zmp3.zadn.vn/lyrics/6/f/9/7/6f97fc3d7c394df24915e878b913d7bb.lrc',
              duration: 245,
            },
            {
              id: 'ZWAFE89B',
              title: 'Em Một Mình Quen Rồi',
              artists_names: 'Dương Hoàng Yến',
              thumbnail_medium:
                'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/7/b/e/9/7be9788129f81d9c3d685969db8ab70a.jpg',
              lyric:
                'https://static-zmp3.zadn.vn/lyrics/d/5/0/1/d50129746dcdf86ef326a7070cbd55b8.lrc',
              duration: 310,
            },
          ],
        },
      },
    ],
  };

  render() {

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerTieuDe}>
          <View style={styles.containerTieuDe,{flexDirection:'row'}}>
          <Icon name='music' size={30}></Icon>
            <Text style={styles.tieuDe}> Playlist của ban: </Text>
             
          </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isRenderAdd: !this.state.isRenderAdd });
              }}>
              <View style={this.state.isRenderAdd ? styles.con1 : styles.con2}>
                <Text style={{ fontSize: 18 }}> Add Playlist</Text>
              </View>
            </TouchableOpacity>
          </View>
          {this.state.isRenderAdd ? this._renderAddPlayList() : null}
          <View style={(styles.container, { flexDirection: 'row' })}>
            <FlatList
              data={this.props.dataAllPlaylist.list}
              extraData={this.props.dataAllPlaylist.list}
              renderItem={({ item, index }) =>
                index % 2 == 0
                  ? this._renderAvatarPlayList(
                    item.id,
                    item.thumbnail_medium,
                    item.title,
                    item.total_song,
                  )
                  : null
              }
            //keyExtractor={item => item.ten}
            />
            <FlatList
              data={this.props.dataAllPlaylist.list}
              extraData={this.props.dataAllPlaylist.list}
              renderItem={({ item, index }) =>
                index % 2 == 1
                  ? this._renderAvatarPlayList(
                    item.id,
                    item.thumbnail_medium,
                    item.title,
                    item.total_song,
                  )
                  : null
              }
            //keyExtractor={item => item.ten}
            />
          </View>

          <View style={{width:'100%',marginTop:10}}>

          <View style={styles.containerTieuDe,{flexDirection:'row'}}>
          <Icon name='download' size={30}></Icon>
            <Text style={styles.tieuDe}> Bài hát đã tải : </Text>   
          </View>
              <View style={{alignItems:'center'}}>
              <DanhSachBaiHat dataDanhSachBaiHat={this.props.dataMusicLocal.items}></DanhSachBaiHat>
              </View>
        
          </View>
        </View>
      </ScrollView>

    );
  }
}

const mapStateToProps=state=>( {
    myPlayList: state.currentPlayListOffline, dataAllPlaylist: state.dataAllPlaylist ,dataMusicLocal:state.dataMusicLocal,
})
export default connect(mapStateToProps, {
  setSongPlay,
  setPlayListOnline,
  setPlayListOffline,
  setDataAllPlayList,
  setDataMusicLocal
})(LibraryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 10,
  },
  input: { maxHeight: 40 },
  con2: {
    fontSize: 20,
    backgroundColor: '#ccc',
    marginLeft: 2,
    borderRadius: 5,
    margin: 5,
  },
  con1: {
    fontSize: 20,
    backgroundColor: '#00cec9',
    marginLeft: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    margin: 5,
  },

  input: { maxHeight: 40 },
  inputContainer: {
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
  plus: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
  tieuDe: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
    fontFamily: 'vincHand',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 3,
    marginBottom: 3,
    borderStartWidth: 2,
    borderRightColor: 'red',
  },
});
