import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
  Animated,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSongPlay, setDataAllPlayList, setDataMusicLocal, setDataBHVuaNghe, removeSongFromLocal,setPlayListOffline ,setPlay} from '../redux/action';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import Player from '../player/Player';
import DanhSachBaiHat from "./DanhSachBaiHat"

const screenWidth = Math.round(Dimensions.get('window').width);

class ItemInforBaiHat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      fadeAni: new Animated.Value(0),
      upPopup: false,
      upPopupAdd: false,
      reaload: 0
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAni, {
      toValue: 100,
      duration: 5000,
    }).start();
  }



  _removeSongFromPlayList()
  {
  
     var idPlaylist=this.props.idPlaylist

   // var path = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/PlayList_Local/MusicLocalManager.js"
   var path = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/PlayList_Local/PlayListManager.js"
    RNFetchBlob.fs.readFile(path, 'utf8').then((data) => {
      temp = JSON.parse(data);
    }).then(()=>{
      for(let i=0;i<temp.list[idPlaylist].song.items.length;i++)
      {
          if(temp.list[idPlaylist].song.items[i].id==this.props.id)
          { 
                temp.list[idPlaylist].song.items.splice(i,1)         
                temp.list[idPlaylist].total_song--;
               break;
          }            
      }
      this.props.setDataAllPlayList(temp);
      this.props.setPlayListOffline(idPlaylist,temp.list[idPlaylist].song.items)
      RNFetchBlob.fs.writeFile(path, JSON.stringify(temp), 'utf8').then(()=>{  
      })
    })
    this.setState({upPopup:false})


  }

  _addSongtoPlaylist(
    idPlaylist,
    idSong,
    title,
    artists_names,
    thumbnail_medium,
    lyric,
    duration,
  ) {
    var temp = {}
    var PATH = RNFetchBlob.fs.dirs.SDCardDir + '/DataLocal/PlayList_Local/PlayListManager.js';
    RNFetchBlob.fs.readFile(PATH).then((data)=>{temp=JSON.parse(data)
    
      for (let i = 0; i < temp.list[idPlaylist].song.items.length; i++) {
        if (temp.list[idPlaylist].song.items[i].id == idSong) {
          Alert.alert("Bài này đã thêm rồi!")
          return;
        }
      }
  
      var obj = {
        id: idSong.toString(),
        title: title,
        artists_names: artists_names,
        thumbnail_medium: thumbnail_medium,
        lyric: lyric,
        duration: duration,
      };
      temp.list[idPlaylist].song.items.push(obj);
      temp.list[idPlaylist].total_song++;
      //var PATH = RNFetchBlob.fs.dirs.SDCardDir + '/DataLocal/PlayList_Local/PlayListManager.js';
      RNFetchBlob.fs.writeFile(PATH, JSON.stringify(temp));
      this.props.setDataAllPlayList(temp);
      Alert.alert("Thêm thành công!");
      
      this.setState({ upPopupAdd: false })
    })
    /*temp.list[idPlaylist].song.items.array.forEach(element => {
      if(element.id==idSong)
      {
        //console("Trung bai");

      }
      
    });*/

    //console.log(JSON.stringify(temp));
  }
  _renderUpPoupAdd() { }

  _downloadMusic(id) {
    var path = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/Music_Local/DataMusicLocal/" + id;
    var pathLyric = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/Music_Local/DataMusicLocal/" + id + "/lyric.js"
    var pathImage = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/Music_Local/DataMusicLocal/" + id + "/thumbnail_medium.jpg"
    RNFetchBlob.fs.exists(path)
      .then((value) => {
        if (value) {
          Alert.alert("Bài này đã tải!")
          return;
        }
        else {
          RNFetchBlob.fs.mkdir(path).then(() => {
            //Down mp3
            let options0 = {
              fileCache: true,
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: this.props.title,
                path: path + '/' + id + '.mp3',
                description: 'Downloading music.'
              }
            }
            RNFetchBlob.config(options0).fetch('GET', 'http://api.mp3.zing.vn/api/streaming/audio/' + this.props.id + '/128').then(() => {
              this._addSongtoMusicLocal();
            })

            //Down lyric
            let options1 = {
              fileCache: true,
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: 'download',
                path: pathLyric,
                description: 'Downloading lyric.'
              }
            }
            RNFetchBlob.config(options1).fetch('GET', this.props.lyric.toString())

            //Down thumbnail
            let options2 = {
              fileCache: true,
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: 'download',
                path: pathImage,
                description: 'Downloading thumbnail_medium'
              }
            }
            RNFetchBlob.config(options2).fetch('GET', this.props.image)



          });

        }
      });
  }

  _addSongtoMusicLocal() {
    var temp = [];
    var pathMp3 = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/Music_Local/DataMusicLocal/" + this.props.id + "/" + this.props.id + ".mp3";
    var pathLyric = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/Music_Local/DataMusicLocal/" + this.props.id + "/lyric.js"
    var pathImage = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/Music_Local/DataMusicLocal/" + this.props.id + "/thumbnail_medium.jpg"
    var path = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/Music_Local/MusicLocalManager.js"
    RNFetchBlob.fs.readFile(path, 'utf8').then((data) => {
      temp = JSON.parse(data)
      let obj = { "id": this.props.id, "title": this.props.title, "artists_names": this.props.artists_names, "thumbnail_medium": pathImage, "lyric": pathLyric, "duration": this.props.duration, "linkMp3": pathMp3 }
      temp.items.push(obj);
      temp.total_song++;
      this.props.setDataMusicLocal(temp);
      RNFetchBlob.fs.writeFile(path, JSON.stringify(temp), 'utf8')
    })
  }

  _addSongtoBHVuaNghe() {
    var RemoveId = false;
    var temp = [];
    var path = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/BaiHatVuaNghe/BaiHatVuaNghe.js";
    
    RNFetchBlob.fs.readFile(path).then((data)=>{
      temp=JSON.parse(data)
      let obj = { "id": this.props.id, "title": this.props.title, "artists_names": this.props.artists_names, "thumbnail_medium": this.props.image, "lyric": this.props.lyric, "duration": this.props.duration, "linkMp3": this.props.linkMp3 }
      for (let i = 0; i < temp.items.length; i++) {
        if (temp.items[i].id == this.props.id) {
          temp.items.splice(i, 1);
          RemoveId = true;
          break;
        }
      }
      if (RemoveId) {
        temp.items.unshift(obj)
      }
      else {
        if (temp.items.length == 5) { temp.items.pop(); }
        temp.items.unshift(obj)
      }
  
      RNFetchBlob.fs.writeFile(path, JSON.stringify(temp), 'utf8').then(() => { }
      )
      this.props.setDataBHVuaNghe(temp)


    })
    //temp = this.props.dataBHVuaNghe;
    
   

  }


  _renderRemove(kindOfPlayList) {
   
    return (
      <TouchableOpacity onPress={() => {kindOfPlayList=="PlayList_Offline"? this._removeSongFromPlayList(): this._removeSongFromLocal() }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
          }}>
          <Icon name="trash" size={30}></Icon>
          <Text>Xóa</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _removeSongFromLocal() {
    var temp = {};
    // temp=this.props.dataMusicLocal.slice()
    var pathSong=RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/Music_Local/DataMusicLocal/"+this.props.id
    var path = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/Music_Local/MusicLocalManager.js"
    RNFetchBlob.fs.readFile(path, 'utf8').then((data) => {
      temp = JSON.parse(data);
    }).then(()=>{
      for(let i=0;i<temp.items.length;i++)
      {
          if(temp.items[i].id==this.props.id)
          { 
               temp.items.splice(i,1)         
               temp.total_song--;
               break;
          }            
      }
      this.props.setDataMusicLocal(temp);  
      RNFetchBlob.fs.writeFile(path, JSON.stringify(temp), 'utf8').then(()=>{  
      RNFetchBlob.fs.unlink(pathSong)
      })
    })
    this.setState({upPopup:false})

    //Alert.alert("Xóa thành công!")

  }

  render() {
    const valueOpa = this.state.fadeAni;
    return (
      <View style={{ flex: 1, width: "100%" }}
        onPress={() => {
        }}>
        <View
          style={[{
            flex: 1,
            width: screenWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 5,
            marginLeft: 5,
            borderRadius:8,
          }, this.props.isTrongSuot == 'true' ? { backgroundColor: '#c8d6e570' } : { backgroundColor: '#c8d6e570',}]}>



          <View>
            <Text
              style={this.props.Stt < 10 ? styles.styleStt0 : styles.styleStt1}>
              {this.props.stt}{' '}
            </Text>
          </View>

          <View style={{ flex: 1, width: '100%' }} onPress={() => { }}>
            <Image
              loadingIndicatorSource={require('../../res/m_musicicon.png')}
              style={styles.imageStyle}
              source={

                this.props.image === 'url' || this.state.isError
                  ? require('../../res/m_musicicon.png')
                  : (this.props.linkMp3 == null ? { uri: this.props.image } : require('../../res/m_musicicon.png'))
              }
              onError={e => this.setState({ isError: true })}></Image>
            {/* <Image style={styles.imageStyle} source={{ uri: 'http://avatar.nct.nixcdn.com/song/2019/10/02/3/1/4/d/1570008789331.jpg' }}></Image> */}
          </View>

          <View style={styles.inforStyle}>

            <Animated.Text
              style={{
                //opacity: valueOpa,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              {this.props.title + ''}
            </Animated.Text>
            <Text
              style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: 13 }}>
              {this.props.artists_names + ''}
            </Text>
            <Text
              style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: 10 }}>
              {parseInt(this.props.duration % 60) < 10
                ? parseInt(this.props.duration / 60) +
                ':' +
                '0' +
                parseInt(this.props.duration % 60, 10)
                : parseInt(this.props.duration / 60) +
                ':' +
                parseInt(this.props.duration % 60, 10)}
            </Text>

          </View>






          <TouchableOpacity
            onPress={() => {
              this.setState({ upPopup: true });
            }}>
            <Image
              style={{
                width: 30,
                height: 60,
                marginRight: 10,
                resizeMode: 'center',
              }}
              source={require('../../res/threeDot.png')}></Image>
          </TouchableOpacity>
          {/*Popup menu add playlist ,download....*/}
          <Modal
            isVisible={this.state.upPopup}
            onBackdropPress={() => {
              this.setState({ upPopup: false });
            }}>
            <View style={{ backgroundColor: '#fff'}}>
              <Button
                title={this.props.title}
                onPress={() => {
                  this.setState({ upPopup: false });
                }}></Button>
              <View style={{ flexDirection: 'row', margin: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ upPopupAdd: true });
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 10,
                    }}>
                    <Icon name="add-to-list" size={30}></Icon>
                    <Text>Thêm vào </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this._downloadMusic(this.props.id) }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 10,
                    }}>
                    <Icon name="download" size={30}></Icon>
                    <Text>Tải về</Text>
                  </View>
                </TouchableOpacity>

                {this.props.canRemove == true ? this._renderRemove(this.props.kind) : null}
              </View>
            </View>
          </Modal>

          {/* popup Addd*/}
          <Modal
            isVisible={this.state.upPopupAdd}
            onBackdropPress={() => {
              this.setState({ upPopupAdd: false });
            }}>
            <View style={{ backgroundColor: '#fff', height: 280 }}>
              <Button
                title={'Chọn playlist để thêm'}
                onPress={() => {
                  this.setState({ upPopupAdd: false });
                }}></Button>
              <View style={{ flex: 1, margin: 0 }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 5,
                  }}>
                  <FlatList
                    data={this.props.dataAllPlaylist.list}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          flex: 1,
                          width: '100%',
                          alignContent: 'center',
                          marginBottom: 5,
                          borderWidth: 2,
                          borderColor: 'red',
                          borderRadius: 3,
                          backgroundColor: '#1abc9c',
                        }}>
                        <TouchableHighlight
                          onPress={() => {
                            this._addSongtoPlaylist(
                              item.id,
                              this.props.id,
                              this.props.title,
                              this.props.artists_names,
                              this.props.image,
                              this.props.lyric,
                              this.props.duration,
                            );

                          }}
                          underlayColor={'#e74c3c'}
                          style={{}}>
                          <View>
                            <Text style={{ fontSize: 18 }}> {item.title}</Text>
                            <Image
                              source={{ uri: item.thumbnail_medium }}
                              style={{ width: 20, height: 20 }}></Image>
                          </View>
                        </TouchableHighlight>
                      </View>
                    )}></FlatList>
                </View>
              </View>
            </View>
          </Modal>

        </View>
      </View>
    );
  }
  // https://facebook.github.io/react-native/docs/flatlist
}

function mapStateToProps(state) {
  return {
    myCurrentSong: state.currentSong,
    dataAllPlaylist: state.dataAllPlaylist,
    dataBHVuaNghe: state.dataBHVuaNghe,
    dataMusicLocal: state.dataMusicLocal,
    idPlaylist:state.currentPlayListOffline.id,
    
    

  };
}

export default connect(mapStateToProps, { setSongPlay, setDataAllPlayList, setDataMusicLocal,setPlayListOffline, setDataBHVuaNghe, removeSongFromLocal,setPlay })(
  ItemInforBaiHat
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#6c5ce7',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 3,
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#74b9ff',
    flexDirection: 'row',
    borderRadius: 3,
    width: '100%',
  },
  inforStyle: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 5,
    marginLeft: 10,
  },
  imageStyle: {
    flex: 2,
    width: 45,
    height: 60,
    margin: 3,
    resizeMode: 'center',
    borderRadius: 8,
  },
  styleStt0: {
    paddingLeft: 10,
    marginRight: 5,

    width: 25,
  },
  styleStt1: {
    paddingLeft: 10,
    marginRight: 4,
    width: 35,
  },
});
