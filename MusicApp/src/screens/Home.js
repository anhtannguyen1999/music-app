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
} 
from 'react-native';
import {Dimensions} from 'react-native';
import {SearchBar} from 'react-native-elements';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
import Player, {MyPlayerBar} from '../player/Player';
const screenWidth = Math.round(Dimensions.get('window').width);
import StreamScreen from '../screens/Stream';

import { connect } from 'react-redux';
import { setSongPlay  } from '../redux/action';

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
      dataGoiY: [],
      searchValue: '',
      data_t: 'lolo',
    };
  }
  static navigationOptions = {
    header: null,
    /*tabBarIcon:({tintColor})=>(
      <Image

      source={require('../../res/home.png')}
      style={{width:20,height:15,tintColor:"black"}}
      >
      </Image>
    )*/

  };

  componentWillMount() {
    this._loadGoiYsearch();

    //console.log((this.state.dataGoiY.length)))
  }
  _coutLog() {
    //console.log("log___data");
    //console.log(this.state.dataGoiY)
  }

  _loadGoiYsearch() {
    //var tt='uiui';
    // fetch("https://zingmp3.vn/api/search/multi?q="+valueSearch+"&ctime=1571563884&sig=b4d8d117b0c44bb6327e8c641a2b863c843ab05be5953764695a13e787abbd969e6c0c180a5c2bd42d33cf6351c848bdcc8b8ea0789be7d2ea29fbada7544c65&api_key=38e8643fb0dc04e8d65b99994d3dafff")
    fetch(
      'https://zingmp3.vn/api/playlist/get-playlist-detail?id=ZWZB969E&ctime=1575126606&sig=1ed0e13e940af18fa93bb91b4335bc35c24713571a1da9f53a78211b5710b26fb03aedbb96dffb4f187da49ab882c03db2948c046c62688fd832d1ad88050bb8&api_key=38e8643fb0dc04e8d65b99994d3dafff',
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        //console.log(response.data.song);
        // tt=JSON.stringify(response.data);
        //console.log(tt+"___aa")
        //this.setdata(tt);
        this.setState({
          dataGoiY: response.data.song.items,
          // data_t:tt
        });
        console.log(this.state.dataGoiY.length);
      });

    /* return(
           
            <FlatList
            data={this.state.dataGoiY}
            extraData={this.state.dataGoiY}
            renderItem={({ item }) => (                                       
            <Text> {item.name} {item.singer}</Text>                                        
            )}
            keyExtractor={item => item.id}  
        
    />
        )*/
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
      <View style={(styles.container1, {backgroundColor: 'fff'})}>
        {/* search bar */}
        <ScrollView></ScrollView>

        <View style={{paddingTop: 0, marginBottom: 0, width: screenWidth}}>
          <SearchBar
            containerStyle={{backgroundColor: '#fff'}}
            round
            backgroundColor
            lightTheme={true}
            searchIcon={{size: 24}}
            placeholder="Type Here..."
            showLoading={false}
            containerStyle={(style = styles.containerSerchBar)}
            // onFocus={() => this.props.navigation.navigate('Search')}
            onFocus={()=>this.searchFor(this.state.searchValue)}
            onChangeText={text => {
              this.setState({searchValue: text});
              var stringSearch = text;
              //this._loadGoiYsearch();
            }}
            onClear={text => this.setState({searchValue: ''})}
            value={this.state.searchValue}
            onSubmitEditing={text => this.searchFor(this.state.searchValue)}
          />
        </View>

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

          <ScrollView horizontal={false} pagingEnabled={true}>
            {/* Top song */}
            <View style={styles.containerBHTop}>
              <View style={styles.containerTieuDe}>
              <Text style={styles.tieuDe}> Bảng xếp hạng</Text>
              </View>
              
              
              <View style={styles.containerBHTop}>
                <FlatList
                  initialNumToRender={10}
                  data={this.state.dataGoiY}
                  extraData={this.state}
                  renderItem={({item, index}) => (
                    // _url= 'http://api.mp3.zing.vn/api/streaming/audio/'+item.id+'/128';
                    <TouchableOpacity
                      flex={1}
                      width={screenWidth}
                      onPress={() => {
                        Player.PlayMusic(
                          item.title,
                          'http://api.mp3.zing.vn/api/streaming/audio/' +
                            item.id +
                            '/128',
                          item.title,
                          item.artists_names,
                          item.thumbnail,
                          item.duration,
                        ),
                          console.log(
                            'play___http://api.mp3.zing.vn/api/streaming/audio/' +
                              item.id +
                              '/128',
                          ),
                          // StreamScreen._setNameSong(item.artists_names,item.title);

                         /* StreamScreen._setNameSong(
                            item.title,
                            item.artists_names,
                          );
                          StreamScreen._setLinkLyric(item.lyric);*/


                        this.props.setSongPlay(item.id,item.title,item.artists_names,item.lyric,item.duration);
                        this.props.navigation.navigate('Stream');
                      }}>
                      <ItemInforBaiHat
                        
                        stt ={++index}
                        id={item.id}
                        title={item.title}
                        artists_names={item.artists_names}
                        image={item.thumbnail}
                        duration={item.duration}
                        lyric={item.lyric}

                        
                        colorItem={1}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.title}
                />
              </View>
            </View>

            {/* Play list goi y */}
            <View style={styles.containerBHTop}>
              <View style={styles.containerTieuDe}>
              <Text style={styles.tieuDe}> Goi y</Text>
              </View>

              <View style={styles.containerBHTop}>
                <FlatList
                  data={DSBaiHatVuaNghe}
                  renderItem={({item}) => (
                    <ItemInforBaiHat
                      ten={item.ten}
                      casi={item.casi}
                      image={item.image}
                      colorItem={item.colorItem}
                    />
                  )}
                  keyExtractor={item => item.ten}
                />
              </View>
            </View>
          </ScrollView>

          {/* Local music */}
          <View style={styles.container}>
            <Text style={styles.tieuDe}> Local</Text>
            <View style={styles.container}>
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
  return { myCurrentSong: state.currentSong };
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
    backgroundColor: '#fff',
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
  tieuDe: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
    fontFamily: 'vincHand',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 3,
    marginBottom: 3,
    borderStartWidth:2,
    borderRightColor:'red',
  },
  containerSerchBar: {
    backgroundColor: '#fff',
  },
  containerTieuDe:{
    borderWidth:2,
    borderColor:'#888',
    width:'93%',
    marginLeft:13,
    paddingBottom:5,

  },
  containerScrollList:{
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'flex-start',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    height:500

  },
});
