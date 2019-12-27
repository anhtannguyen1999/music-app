import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {Dimensions} from 'react-native';
import {SearchBar} from 'react-native-elements';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
import DanhSachBaiHat from '../components/DanhSachBaiHat';
import PlayList from '../components/PlayList';
import Player, {MyPlayerBar} from '../player/Player';
const screenWidth = Math.round(Dimensions.get('window').width);
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon_ from 'react-native-vector-icons/FontAwesome5Pro';
import StreamScreen from '../screens/Stream';
import RNFetchBlob from 'rn-fetch-blob';

import {connect} from 'react-redux';
import {
  setSongPlay,
  setPlayListOnline,
  setDataAllPlayList,
  setDataBHVuaNghe
} from '../redux/action';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      dataTop100: [],
      dataTop100nhacTre: [],
      dataTop100EDM: [],
      dataTop100truTinh: [],
      dataTop100cachMang: [],
      dataPlayListGoiY: [],
      searchValue: '',
      data_t: 'lolo',
      indexPageTop100: 0,
      loaiNhacTop100: 'nhacTre',
      enableScrollViewScroll: true,
    };
  }
  static navigationOptions = {
    header: null,
  };

  _renderBHTOP(stt, id, title, artists_names, thumbnail, lyric, duration) {
    return (
      <TouchableOpacity
        flex={1}
        width={screenWidth}
        onPress={() => {
          Player.PlayMusic(
            title,
            'http://api.mp3.zing.vn/api/streaming/audio/' + id + '/128',
            title,
            artists_names,
            thumbnail,
            duration,
          ),
            console.log(
              'play___http://api.mp3.zing.vn/api/streaming/audio/' +
                id +
                '/128',
            ),
            this.props.setSongPlay(id, title, artists_names, lyric, duration);
          this.props.navigation.navigate('Stream');
        }}>
        <ItemInforBaiHat
          stt={stt}
          id={id}
          title={title}
          artists_names={artists_names}
          image={thumbnail}
          duration={duration}
          lyric={lyric}
          colorItem={1}
        />
      </TouchableOpacity>
    );
  }
  _renderPlayList(id, thumbnail_medium, title, total_song) {
    return (
      <TouchableOpacity
        onPress={() => {
          this._loadDataSongInPlayListGoiY(id);
          this.props.navigation.navigate('ChiTiet_PlayListOnline', {
            id: id,
            thumbnail_medium: thumbnail_medium,
            title: title,
            numberSong: total_song,
          });
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

  componentWillMount() {
    this._loadDataTop100_nhacTre();
    this._loadDataTop100_nhacEDM();
    this._loadDataTop100_truTinh();
    this._loadDataTop100_cachMang();
    this._loadDataPlayListGoiY();
    this._loadDataSongInPlayListGoiY('');
    this._loadLocalAllPlayList();
    this._loadDataBHVuaNghe()

    //this.setState({dataTop100:this.state.dataTop100nhacTre})
    //console.log((this.state.dataTop100.length)))
  }

  _loadDataTop100_nhacTre() {
    fetch(
      'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZWZB969E&ctime=1575126606&sig=1ed0e13e940af18fa93bb91b4335bc35c24713571a1da9f53a78211b5710b26fb03aedbb96dffb4f187da49ab882c03db2948c046c62688fd832d1ad88050bb8&api_key=38e8643fb0dc04e8d65b99994d3dafff',
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          dataTop100: response.data.song.items,
          dataTop100nhacTre: response.data.song.items,
        });
      });
  }

  _loadDataTop100_nhacEDM() {
    fetch(
      'https://zingmp3.vn/api/playlist/get-playlist-detail?id=Z6CZOIWU&ctime=1575943109&sig=c1e46732088a2bb842dfb2d5134f3221afc5fee1a270c3e7f638a95d5118ccbac222639845d564623902bf92e1f8a86c8220bd6d9dd2e980ec92d6a52c3dfae0&api_key=38e8643fb0dc04e8d65b99994d3dafff',
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          dataTop100EDM: response.data.song.items,
        });
      });
  }

  _loadDataTop100_truTinh() {
    fetch(
      'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZWZB969F&ctime=1575940775&sig=1f73c85f785a5fea6d5b8f180ced99330f71ae7df6b9db2594c3a4e786fdecfc741e1087553713fc427d32333089fc4c3022a3d8fe6c3d3a3fbbc4660dd829ff&api_key=38e8643fb0dc04e8d65b99994d3dafff',
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          dataTop100truTinh: response.data.song.items,
        });
      });
  }

  _loadDataTop100_cachMang() {
    fetch(
      'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZWZB96AO&ctime=1575944497&sig=871b94924c386510797085799869a310f8aa8a6f1b7d87677edea2048ec5a6670b85436ac36dc5f1501479d9db6ea0a87a1db9eba2266a90c2f631f9c08fb388&api_key=38e8643fb0dc04e8d65b99994d3dafff',
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          dataTop100cachMang: response.data.song.items,
        });
      });
  }
  _loadDataPlayListGoiY() {
    fetch(
      'https://zingmp3.vn/api/topic/get-detail?id=IWZ9Z0C8&ctime=1575965470&sig=49fcff94dd43b8cf333c85a1fef657d3f2d241364fde4fcd7aedd7d427ea8e4b80345d5448a78307446f7856a02e5213b739d19f017f93ae8543e50945e56cd6&api_key=38e8643fb0dc04e8d65b99994d3dafff',
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          dataPlayListGoiY: response.data.playlist.items,
        });
      });
  }
  _loadDataSongInPlayListGoiY(id) {
    var uri =
      'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZU9EUF68&ctime=1576047881&sig=5a96d12bda7da85723b7b894214fff4371d1ea8cac27ffd5cfa5dd4e10964338b9d4b0fd1057bf20b212a7c5388b4f597bb2b4f76c5f89ac5dc059b2b681aa5c&api_key=38e8643fb0dc04e8d65b99994d3dafff';

    switch (id) {
      case 'ZU9EUF68': //Nhac viet noi bat
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZU9EUF68&ctime=1576114288&sig=e40aeec45bf9d262efc23153a4f290db09967fc263dcded9395bb67bcc73fec5e6b88a03fda8a9dd5e9500f6d03dca34365d7d2956c4a5b913df9c8cfd96e07b&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZU9EUF76': //K-Pop
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZU9EUF76&ctime=1576114380&sig=7b239520eb48c113b2b21aa8708c5f9bbd029303f194fe1ec31ae535d6090258b6fb12a79419b93da4c9d7072b8c7419f875604a19eb7b519c342c02ce43838e&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZUA67EDW': //US-UK
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZUA67EDW&ctime=1576114456&sig=c6ee7ef1bd2ca003803f09d13344e5acabe148711b53efc6101c7b62f4d0fb517db85aea55f83497c467427babd1ca0f2290ed550700dd7b4967da005b523c0f&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZU9DCU07': //C-Pop noi bat
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZU9DCU07&ctime=1576114595&sig=bfc888e876c810fbc238df2091063bd1cbde54a56afe6ebf706cc5691340e2ede19bdfa504f60f71a812b179c787c7fd0a0280a7989c4c9661b61b59d6356c4c&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZU8IICE0': //Rap Viet
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZU8IICE0&ctime=1576114639&sig=809b51bcadcccdb167a08966056b68f4eea05fcaea4011aad70243eba42fea476a473f5bcc19c31f86240048e33b42e433cf22772742a7b846ae0a2fd6230e8f&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZU8ZUWC9': //Pop balad
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZU8ZUWC9&ctime=1576114740&sig=28af191e8e651aa6c122b6aec7aaf86aacb1a41b948141c9faea318091a6f4c479bf9962d9b0ead2c12257c76df64680b3c30fcde217960ae6b5b6c227c98b9e&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZU6ZEAZD': //Dance Viet
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZU6ZEAZD&ctime=1576114795&sig=7ce9f0824834903f86b6d21ad0edb8d04459cf361f1f0f73f3551787ca22e308e771839877cd122bbf1a59ee32bf4c079f1950953d173a8c608333b5083803dd&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZUAF0ZWO': //Bolero
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZUAF0ZWO&ctime=1576114849&sig=2ac69d5a56399799f6fb3854129af1518093226a47ae0e52a1af962dbdfc9136cf878f9d4524c0c927173d658f986f739ea5a958d894b6edb94f90b6a3ff70f9&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZU6BW90D': //Nhac viet duoc nghe nhieu nhat
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZU6BW90D&ctime=1576114897&sig=0c8fef1d9b1a62ea7664e166af6f09977bfc9eda024c52c018b3289896b85d57e8eb4d869661fead5ae07aa2627b6ddf74d293741dad7ffe693d999ad5b6e012&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZOUWWOOO': //Giong hat moi noi bat
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZOUWWOOO&ctime=1576114944&sig=50f5f9c9fc91b46e0b92fb0e32518f38f96155b74ad11aa331d739d381f8a9b58e44c4d5576d5a2f17179a9c0cc91f39ecbd19e7c33bf5defaa624fc640d1ace&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZWZCOBEF': //Nhac viet day hua hen
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZWZCOBEF&ctime=1576115001&sig=87a85341a47e787a2afd9613bc27026d315e09688925395f65bedab6329e4a4b2f6116ac11e5ea175cb8158fd3850882210087afc421f1c709c2d94e33d67826&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
      case 'ZOUWIWDU': //V-Pop band
        uri =
          'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZOUWIWDU&ctime=1576115049&sig=bb95e683e36840bbc45310bdc01b136a67fd98ea217bedb362f8969bce8e381cebd63446f68a0b4e2d4e988421a9a10c841ef544ca477fa7d58ac53a9fa981ff&api_key=38e8643fb0dc04e8d65b99994d3dafff';
        break;
    }
    fetch(uri)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.props.setPlayListOnline(id, response.data);
      });
  }

  _loadLocalAllPlayList() {
    const dirs = RNFetchBlob.fs.dirs;
    const fs = RNFetchBlob.fs;
    var PATH = dirs.SDCardDir + '/DataLocal/PlayList_Local/PlayListManager.js';
    //var PATH=dirs.SDCardDir+'/DataLocal/PlayList_Local/qq.js'
    RNFetchBlob.fs.readFile(PATH, 'utf8').then(data => {
      this.props.setDataAllPlayList(JSON.parse(data));
      
      //console.log(this.props.dataAllPlaylist.list[0].title)
    });
  }
_loadDataBHVuaNghe()
{
  var path= RNFetchBlob.fs.dirs.SDCardDir+"/DataLocal/BaiHatVuaNghe/BaiHatVuaNghe.js"
  RNFetchBlob.fs.readFile(path,'utf8').then((data)=>{
    var temp=[],
    temp=JSON.parse(data)
    this.props.setDataBHVuaNghe(temp)
  })
}
  render() {

    return (
      <ImageBackground
        source={require('../../res/BG2.jpg')} style={{ flex: 1, backgroundColor:'#48dbfb'}}>
          <View
        onStartShouldSetResponderCapture={() => {
          this.setState({enableScrollViewScroll: true});
        }}
        style={{ flex: 1, backgroundColor:'transparent'}}>
        <ScrollView
          pagingEnabled={false}
          scrollEnabled={this.state.enableScrollViewScroll}
          ref={myScroll => (this._myScroll = myScroll)}
          style={{flex: 1}}>
          {/* Anh bia */}
          <TouchableOpacity>
            <Image
              style={{
                width: screenWidth,
                height: 60,
                marginTop: 1,
                marginBottom: 2,
              }}
              source={require('../../res/cover.jpg')}
            />
          </TouchableOpacity>

          {/* 2 Bai hat da nghe gan day */}

          <View style={styles.containerBHTop}>
            <View style={styles.containerTieuDe}>
            <View style={{flexDirection:'row',marginLeft:10,alignItems:'center'}}>
              <Icon name={'file-audio'} color={'#341f97'} size={20}> </Icon>
              <Text style={styles.tieuDe}>Bài hát gần đây </Text>
              
              </View>
              
            </View>

            <View
              style={(styles.containerBHTop, {height: 220})}
              onStartShouldSetResponderCapture={() => {
                this.setState({enableScrollViewScroll: false});
                /*if (
                  this._myScroll.contentOffset === 0 &&
                  this.state.enableScrollViewScroll === false
                ) {
                  this.setState({enableScrollViewScroll: true});
                }*/
              }}>
              <DanhSachBaiHat
                dataDanhSachBaiHat={this.props.dataBHVuaNghe.items}></DanhSachBaiHat>
            </View>
          </View>

          {/*Top song + playlist   */}
          <View style={{flex: 1}}>
            {/* Top song */}
            <View style={styles.containerBHTop100}>
              <View style={styles.containerTieuDe}>
              <View style={{flexDirection:'row',marginLeft:10,alignItems:'center'}}>
              <Icon name={'list-ol'} color={'#341f97'} size={20}> </Icon>
              <Text style={styles.tieuDe}>Bảng xếp hạng </Text>
              
              </View>
                
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#ffffff66',
                  marginLeft: 13,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      loaiNhacTop100: 'nhacTre',
                      dataTop100: this.state.dataTop100nhacTre,
                    });
                  }}>
                                      <View style={
                      this.state.loaiNhacTop100 == 'nhacTre'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    <Text
                    style={
                      this.state.loaiNhacTop100 == 'nhacTre'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    {' '}
                    Nhạc trẻ{' '}
                  </Text>
                  <Icon name='guitar' size={15} style={[
                      this.state.loaiNhacTop100 == 'nhacTre'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    ,{borderWidth:0}]}></Icon>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      loaiNhacTop100: 'EDM',
                      dataTop100: this.state.dataTop100EDM,
                    });
                  }}>
                    <View style={
                      this.state.loaiNhacTop100 == 'EDM'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    <Text
                    style={
                      this.state.loaiNhacTop100 == 'EDM'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    {' '}
                    EDM{' '}
                  </Text>
                  <Icon name='dot-circle' size={15} style={[
                      this.state.loaiNhacTop100 == 'EDM'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    ,{borderWidth:0}]}></Icon>
                    </View>

                  
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      loaiNhacTop100: 'truTinh',
                      dataTop100: this.state.dataTop100truTinh,
                    });
                  }}>
                                                        <View style={
                      this.state.loaiNhacTop100 == 'truTinh'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    <Text
                    style={
                      this.state.loaiNhacTop100 == 'truTinh'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    {' '}
                    Trữ tình{' '}
                  </Text>
                  <Icon name='heart' size={15} style={[
                      this.state.loaiNhacTop100 == 'truTinh'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    ,{borderWidth:0}]} ></Icon>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      loaiNhacTop100: 'cachMang',
                      dataTop100: this.state.dataTop100cachMang,
                    });
                  }}>
                 <View style={
                      this.state.loaiNhacTop100 == 'cachMang'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    <Text
                    style={
                      this.state.loaiNhacTop100 == 'cachMang'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    {' '}
                    Cách mạng{' '}
                  </Text>
                  <Icon name='fighter-jet' size={15} style={[
                      this.state.loaiNhacTop100 == 'cachMang'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    ,{borderWidth:0}]}></Icon>
                    </View>
                </TouchableOpacity>
              </View>

              <View
                style={styles.containerBHTop}
                style={styles.containerBHTop}
                onMoveShouldSetResponderCapture={() => {
                  this.setState({enableScrollViewScroll: false});
                }}>
                <DanhSachBaiHat
                  dataDanhSachBaiHat={this.state.dataTop100}></DanhSachBaiHat>
              </View>
              {/*button next page*/}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginBottom: 40,
                }}></View>
            </View>

            {/* Play list goi y */}
            <View style={styles.containerBHTop}>
              <View style={styles.containerTieuDe}>
              <View style={{flexDirection:'row',marginLeft:10,alignItems:'center'}}>
              <Icon name={'playstation'} color={'#341f97'} size={20}> </Icon>
              <Text style={styles.tieuDe}>Playlist gợi ý </Text>
              
              </View>
              </View>

              <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                colo>
                <View style={(styles.containerBHTop, {flexDirection: 'row'})}>
                  <FlatList
                    data={this.state.dataPlayListGoiY}
                    renderItem={({item, index}) =>
                      index % 2 == 0 && index < 6
                        ? this._renderPlayList(
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
                    data={this.state.dataPlayListGoiY}
                    renderItem={({item, index}) =>
                      index % 2 == 1 && index < 6
                        ? this._renderPlayList(
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

                <View style={(styles.container, {flexDirection: 'row'})}>
                  <FlatList
                    data={this.state.dataPlayListGoiY}
                    renderItem={({item, index}) =>
                      index % 2 == 0 && index >= 6 && index < 12
                        ? this._renderPlayList(
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
                    data={this.state.dataPlayListGoiY}
                    renderItem={({item, index}) =>
                      index % 2 == 1 && index >= 6 && index < 12
                        ? this._renderPlayList(
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
              </ScrollView>
              <Text style={{ color:'#341f97'}}> {'<< '}Lướt để xem Playlist khác >></Text>
            </View>
          </View>

          {/* Local music */}
          <View style={(styles.container, {backgroundColor: '#eee'})}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Library')}>
                              <View style={{flexDirection:'row'}}>
                              <Text style={styles.tieuDe}>
                {' '}
                {'Đến playlist - thư viện của bạn'}
              </Text>
              <Icon name={'sign-in-alt'} color={'#341f97'} size={30}> </Icon>
              </View>


            </TouchableOpacity>
          </View>
        </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  gotoSongScreen() {
    this.props.navigation.navigate('Song');
  }

  searchFor(value) {
    this.props.navigation.navigate('Search', {
      textForSearch: value,
      isRequireForSearch: true,
    });
  }
}

function mapStateToProps(state) {
  return {myCurrentPlayListOnline: state.currentPlayListOnline,dataAllPlaylist:state.dataAllPlaylist,dataBHVuaNghe: state.dataBHVuaNghe,};
}

export default connect(mapStateToProps, {
  setSongPlay,
  setPlayListOnline,
  setDataAllPlayList,
  setDataBHVuaNghe
})(HomeScreen);

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#ffb8b8',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#000',
    margin: 5,
    borderRadius: 10,
  },
  containerBHTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffbe',
    margin: 10,
    borderRadius: 10,

    //borderWidth:2,
    //borderColor:'#000'
  },
  containerBHTop100: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#ffffffbe',
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00000011',
    height: 515,
  },
  tieuDe: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
    fontFamily: 'vincHand',
    fontWeight: 'bold',
    marginTop: 3,
    marginLeft: 8,
    marginBottom: 5,
    borderStartWidth: 2,
    borderRightColor: 'red',
    color:'#341f97',
    
  },
  containerSerchBar: {
    backgroundColor: '#ffffffbe',
  },
  containerTieuDe: {
    borderWidth: 1,
    borderTopColor:'transparent',
    borderLeftColor:'transparent',
    borderRightColor:'transparent',
    borderBottomColor:'#00000011',
    borderRadius: 10,
    width: '100%',
    paddingBottom: 1,
    backgroundColor:'#ffffffdd',
  },
  containerScrollList: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'flex-start',
    backgroundColor: '#ffffffbe',
    margin: 10,
    borderRadius: 10,
    height: 500,
  },
  textLoaiNhacTop100: {
    fontSize: 20,
    backgroundColor: '#c8d6e5cc',
    marginLeft: 2,
    borderRadius: 5,
    color:'#222f3e',
    alignItems:'center'

  },
  textLoaiNhacTop100Active: {
    fontSize: 20,
    backgroundColor: '#0abde3cc',
    marginLeft: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffffffbe',
    color:'#ffffff',
    alignItems:'center'
  },
});
