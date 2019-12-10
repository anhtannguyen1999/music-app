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
} from 'react-native';
import {Dimensions} from 'react-native';
import {SearchBar} from 'react-native-elements';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
import PlayList from '../components/PlayList';
import Player, {MyPlayerBar} from '../player/Player';
const screenWidth = Math.round(Dimensions.get('window').width);
import Icon from 'react-native-vector-icons/FontAwesome';
import StreamScreen from '../screens/Stream';

import {connect} from 'react-redux';
import {setSongPlay} from '../redux/action';

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
  _renderPlayList(thumbnail_medium,title,total_song)
  {
    return(
      <PlayList
      linkImagePlayList={thumbnail_medium}
      title={title}
      numberSong={total_song}>
      {' '}
    </PlayList>
    )
  }

  componentWillMount() {
    this._loadDataTop100_nhacTre();
    this._loadDataTop100_nhacEDM();
    this._loadDataTop100_truTinh();
    this._loadDataTop100_cachMang();
    this._loadDataPlayListGoiY();
    //this.setState({dataTop100:this.state.dataTop100nhacTre})
    //console.log((this.state.dataTop100.length)))
  }
  _coutLog() {
    //console.log("log___data");
    //console.log(this.state.dataTop100)
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

  render() {
    var DSBaiHatVuaNghe = [
      {
        ten: 'Co tham khong ve',
        casi: 'First Item',
        image: 'url',
        colorItem: 0,
      },
      {
        ten: 'Em gi oi',
        casi: 'Jack & KICM',
        image: 'url',
        colorItem: 1,
      },
    ];

    return (
      <View style={(styles.container1, {backgroundColor: '#eee'})}>
        {/* search bar */}

        {/* <View style={{ paddingTop: 0, marginBottom: 0, width: screenWidth }}>
          <SearchBar
            containerStyle={{ backgroundColor: '#fff' }}
            round
            backgroundColor
            lightTheme={true}
            searchIcon={{ size: 24 }}
            placeholder="Type Here..."
            showLoading={false}
            containerStyle={(style = styles.containerSerchBar)}
            // onFocus={() => this.props.navigation.navigate('Search')}
            onFocus={() => this.searchFor(this.state.searchValue)}
            onChangeText={text => {
              this.setState({ searchValue: text });
              var stringSearch = text;
              //this._loadDataTop100_nhacTre();
            }}
            onClear={text => this.setState({ searchValue: '' })}
            value={this.state.searchValue}
            onSubmitEditing={text => this.searchFor(this.state.searchValue)}
          />
        </View>*/}

        {/* Hien thi cac scroll view chua cac danh sach cac bai hat...*/}
        <ScrollView horizontal={false} pagingEnabled={false}>
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
              <Text style={styles.tieuDe}> Bài hát gần đây</Text>
            </View>

            <View style={styles.containerBHTop}>
              <FlatList
                data={DSBaiHatVuaNghe}
                renderItem={({item}) => (
                  // <ScrollView horizontal={true} pagingEnabled={true}>

                  <ItemInforBaiHat
                    ten={item.ten}
                    casi={item.casi}
                    image={item.image}
                    colorItem={item.colorItem}
                  />
                )}
                // </ScrollView>}
                keyExtractor={item => item.ten}
              />
            </View>
          </View>

          <ScrollView horizontal={false} pagingEnabled={true} on>
            {/* Top song */}
            <View style={styles.containerBHTop100}>
              <View style={styles.containerTieuDe}>
                <Text style={styles.tieuDe}> Bảng xếp hạng:</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  marginLeft: 13,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      loaiNhacTop100: 'nhacTre',
                      dataTop100: this.state.dataTop100nhacTre,
                    });
                  }}>
                  <Text
                    style={
                      this.state.loaiNhacTop100 == 'nhacTre'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    {' '}
                    Nhạc trẻ{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      loaiNhacTop100: 'EDM',
                      dataTop100: this.state.dataTop100EDM,
                    });
                  }}>
                  <Text
                    style={
                      this.state.loaiNhacTop100 == 'EDM'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    {' '}
                    EDM{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      loaiNhacTop100: 'truTinh',
                      dataTop100: this.state.dataTop100truTinh,
                    });
                  }}>
                  <Text
                    style={
                      this.state.loaiNhacTop100 == 'truTinh'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    {' '}
                    Trữ tình{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      loaiNhacTop100: 'cachMang',
                      dataTop100: this.state.dataTop100cachMang,
                    });
                  }}>
                  <Text
                    style={
                      this.state.loaiNhacTop100 == 'cachMang'
                        ? styles.textLoaiNhacTop100Active
                        : styles.textLoaiNhacTop100
                    }>
                    {' '}
                    Cách mạng{' '}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.containerBHTop}>
                <FlatList
                  initialNumToRender={10}
                  data={this.state.dataTop100}
                  extraData={this.state}
                  getItemLayout={this.getItemLayout}
                  initialNumToRender={5}
                  maxToRenderPerBatch={10}
                  windowSize={10}
                  renderItem={({item, index}) =>
                    // _url= 'http://api.mp3.zing.vn/api/streaming/audio/'+item.id+'/128';
                    this.state.indexPageTop100 + 5 > index &&
                    index >= this.state.indexPageTop100
                      ? this._renderBHTOP(
                          ++index,
                          item.id,
                          item.title,
                          item.artists_names,
                          item.thumbnail_medium,
                          item.lyric,
                          item.duration,
                        )
                      : this._coutLog()
                  }
                  keyExtractor={item => item.id}
                />
              </View>
              {/*button next page*/}
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.state.indexPageTop100 == 0
                        ? this.setState({indexPageTop100: 95})
                        : this.setState({
                            indexPageTop100: this.state.indexPageTop100 - 5,
                          });
                    }}>
                    <Icon name={'arrow-left'} size={30} color={'#012'}></Icon>
                  </TouchableOpacity>

                  <Text style={{width: 60}}>
                    {' '}
                    Page {parseInt(this.state.indexPageTop100 / 5)}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      this.state.indexPageTop100 == 95
                        ? this.setState({indexPageTop100: 0})
                        : this.setState({
                            indexPageTop100: this.state.indexPageTop100 + 5,
                          });
                    }}>
                    <Icon name={'arrow-right'} size={30} color={'#012'}></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Play list goi y */}
            <View style={styles.containerBHTop}>
              <View style={styles.containerTieuDe}>
                <Text style={styles.tieuDe}> PlayList gợi ý: </Text>
              </View>

              <View style={(styles.containerBHTop, {flexDirection: 'row'})}>
                <FlatList
                  data={this.state.dataPlayListGoiY}
                  renderItem={({item,index}) => (
                      (index%2==0&&index<6)? this._renderPlayList(item.thumbnail_medium,item.title,item.total_song):null
                  )}
                  //keyExtractor={item => item.ten}
                />

                <FlatList
                  data={this.state.dataPlayListGoiY}
                  renderItem={({item,index}) => (
                    (index%2==1&&index<6)? this._renderPlayList(item.thumbnail_medium,item.title,item.total_song):null
                  )}
                  //keyExtractor={item => item.ten}
                />
              </View>
            </View>
          </ScrollView>

          {/* Local music */}
          <View style={styles.container}>
            <Text style={styles.tieuDe}> Local</Text>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <FlatList
                data={this.state.DSBaiHatTopGoiY}
                renderItem={({item}) => (
                  <Text>
                    {' '}
                    {item.title} {item.artists.name}
                  </Text>
                )}
                keyExtractor={item => item.title}
              />

              <FlatList
                data={this.state.DSBaiHatTopGoiY}
                renderItem={({item}) => (
                  <Text>
                    {' '}
                    {item.title} {item.artists.name}
                  </Text>
                )}
                keyExtractor={item => item.title}
              />
            </View>
          </View>
        </ScrollView>
      </View>
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
  return {myCurrentSong: state.currentSong};
}

export default connect(null, {setSongPlay})(HomeScreen);

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
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,

    //borderWidth:2,
    //borderColor:'#000'
  },
  containerBHTop100: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    height: 495,
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
  containerSerchBar: {
    backgroundColor: '#fff',
  },
  containerTieuDe: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    borderColor: '#888',
    width: '100%',
    marginTop: -2,
    paddingBottom: 0,
  },
  containerScrollList: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'flex-start',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    height: 500,
  },
  textLoaiNhacTop100: {
    fontSize: 20,
    backgroundColor: '#ccc',
    marginLeft: 2,
    borderRadius: 5,
  },
  textLoaiNhacTop100Active: {
    fontSize: 20,
    backgroundColor: '#00cec9',
    marginLeft: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
});
