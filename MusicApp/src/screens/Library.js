import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  ImageBackground,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PlayList from '../components/PlayList';
import RNFetchBlob from 'rn-fetch-blob';

import {connect} from 'react-redux';
import {
  setSongPlay,
  setPlayListOnline,
  setPlayListOffline,
  setDataAllPlayList,
  setDataMusicLocal,
} from '../redux/action';
import DanhSachBaiHat from '../components/DanhSachBaiHat';
import {ScrollView} from 'react-native-gesture-handler';
class LibraryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataPlayList: [],
      isRenderAdd: false,
      namePlayListAdd: '',
      rerender: 0,
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
        {/* <PlayList
          canRemove={true}
          linkImagePlayList={thumbnail_medium}
          title={title}
          numberSong={total_song}>
          {' '}
        </PlayList> */}

        <View style={styles.containerAvt}>
          
            <View style={{alignItems: 'flex-end', flex: 1, width: '100%'}}>
              <TouchableOpacity onPress={() => {this._showAlertRemovePlaylist(id,title)}}>
                <Icon name="minus-square" size={22}></Icon>
              </TouchableOpacity>
            </View>
          
          <Image
            loadingIndicatorSource={require('../../res/m_musicicon.png')}
            style={styles.imageStyle}
            source={{uri: thumbnail_medium}}
            onError={e => {}}></Image>

          <Text style={{fontSize: 8}}> {title}</Text>
          <Text style={{fontSize: 8}}> {total_song} bài</Text>
        </View>
      </TouchableOpacity>
    );
  }
  _showAlertRemovePlaylist(id,title)
  {
    Alert.alert(
      '',
      'Bạn có chắc xóa Playlist: '+title+"?",
      [
        {text: '', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this._removePlaylist(id)},
      ],
      {cancelable: false},
    );

  }
  _removePlaylist(id)
  {
    var PATH =
      RNFetchBlob.fs.dirs.SDCardDir +
      '/DataLocal/PlayList_Local/PlayListManager.js';
  
    var temp = this.props.dataAllPlaylist;
    for(let i=0;i<temp.list.length;i++)
    {
      if(temp.list[i].id==id)
      {
        temp.total_list--;
        temp.list.splice(i,1);
        
        RNFetchBlob.fs.writeFile(PATH, JSON.stringify(temp)).then(()=>{
          this._loadLocalPlayList();
        })
        return;
      }
    }
    console.log(temp)

  }
  componentDidMount() {
    this._loadLocalPlayList();
    this._loadDataMusicLocal();
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
        <View style={{padding: 20}}>
          <Text> Tên Playlist bạn muốn tạo:</Text>
          <TextInput
            style={{
              backgroundColor: '#eee',
              margin: 10,
              width: '90%',
              borderRadius: 10,
            }}
            onChangeText={text =>
              this.setState({namePlayListAdd: text})
            }></TextInput>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginRight: 25,
            }}>
            <Button
              title={'Tạo'}
              onPress={() => {
                this._addPlayList(), this.setState({isRenderAdd: false});
              }}></Button>
            <Text> </Text>
            <Button
              title={'Hủy'}
              onPress={() => {
                this.setState({isRenderAdd: false});
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
    var index=0;
    for(let i=0;i<this.props.dataAllPlaylist.total_list;i++)
    {
      if(this.props.dataAllPlaylist.list[i].id==id)
        {
          index=i;
          break;
        }
    }
    this.props.setPlayListOffline(
      id,
      this.props.dataAllPlaylist.list[index].song.items,
    );
    //console.log(LibraryScreen.dataTest[0].song.items)
    //console.log(this.props.myPlayList.dataSong)
  }

  _addPlayList() {
    if (this.state.namePlayListAdd == '') return;
    var PATH =
      RNFetchBlob.fs.dirs.SDCardDir +
      '/DataLocal/PlayList_Local/PlayListManager.js';
    var temp = this.props.dataAllPlaylist;
    if(temp.total_list>0)
    {
      var lastIndex = temp.list[temp.total_list-1].id+1;
    }

    else
    {
      var lastIndex =0;
    }
    var obj = {
      id: lastIndex.toString(),
      title: this.state.namePlayListAdd,
      thumbnail_medium:
        'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/music-icon.png',
      total_song: 0,
      song: {items: []},
    };
    temp.list.push(obj);
    temp.total_list++;
    this.props.setDataAllPlayList(temp);
    RNFetchBlob.fs.writeFile(PATH, JSON.stringify(temp));

    //console.log(temp)

    // this.setState({dataPlayList:temp})
  }
  _loadDataMusicLocal() {
    var path =
      RNFetchBlob.fs.dirs.SDCardDir +
      '/DataLocal/Music_Local/MusicLocalManager.js';
    var temp = [];
    RNFetchBlob.fs.readFile(path, 'utf8').then(data => {
      temp = JSON.parse(data);
      this.props.setDataMusicLocal(temp);
    });
  }

  render() {
    return (
      <ImageBackground style={{flex: 1}} source={require('../../res/BG2.jpg')}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#ffffffaa',
            margin: 5,
            paddingLeft: 2,
            paddingTop: 10,
            borderRadius: 8,
          }}>
          <View style={styles.container}>
            <View style={styles.containerTieuDe}>
              <View style={[styles.containerTieuDe, {flexDirection: 'row'}]}>
                <Icon name="music" color={'#341f97'} size={30}></Icon>
                <Text style={styles.tieuDe}> Playlist của bạn </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isRenderAdd: !this.state.isRenderAdd});
                  }}>
                  <View
                    style={this.state.isRenderAdd ? styles.con1 : styles.con2}>
                    <Icon
                      name="plus-square"
                      color={
                        this.state.isRenderAdd == true ? '#0abde3cc' : '#341f97'
                      }
                      size={25}></Icon>
                    {/* <Text style={{ fontSize: 18 }}> Thêm Playlist</Text> */}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.isRenderAdd ? this._renderAddPlayList() : null}
            <View style={(styles.container, {flexDirection: 'row'})}>
              <FlatList
                data={this.props.dataAllPlaylist.list}
                extraData={this.props.dataAllPlaylist.list}
                renderItem={({item, index}) =>
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
                renderItem={({item, index}) =>
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

            <View style={{width: '100%', marginTop: 10}}>
              <View style={(styles.containerTieuDe, {flexDirection: 'row'})}>
                <Icon name="download" color={'#341f97'} size={30}></Icon>
                <Text style={styles.tieuDe}> Bài hát đã tải </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <DanhSachBaiHat
                  kind="downLoad"
                  canRemove={true}
                  dataDanhSachBaiHat={
                    this.props.dataMusicLocal.items
                  }></DanhSachBaiHat>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  myPlayList: state.currentPlayListOffline,
  dataAllPlaylist: state.dataAllPlaylist,
  dataMusicLocal: state.dataMusicLocal,
});
export default connect(mapStateToProps, {
  setSongPlay,
  setPlayListOnline,
  setPlayListOffline,
  setDataAllPlayList,
  setDataMusicLocal,
})(LibraryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //backgroundColor: '#fff',
    flexDirection: 'column',
    // padding: 10,
  },
  input: {maxHeight: 40},
  con2: {
    justifyContent: 'flex-end',
    fontSize: 20,
    backgroundColor: '#fff',
    marginLeft: 2,
    borderRadius: 5,
    margin: 5,
  },
  con1: {
    justifyContent: 'flex-end',
    fontSize: 20,
    backgroundColor: '#fff',
    marginLeft: 2,
    borderRadius: 5,
    borderWidth: 0,
    // borderColor: '#0abde3cc',
    margin: 5,
  },

  input: {maxHeight: 40},
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
    width: '83%',
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
    color: '#341f97',
  },
  containerAvt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    width: 186,
    height: 190,
  },
  imageStyle: {
    width: 135,
    height: 135,
    margin: 3,
    resizeMode: 'center',
    borderRadius: 3,
  },
});
