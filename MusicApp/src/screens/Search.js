import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Dimensions} from 'react-native';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
const screenWidth = Math.round(Dimensions.get('window').width);
import Player, {MyPlayerBar} from '../player/Player';
import StreamScreen from '../screens/Stream';

import {connect} from 'react-redux';
import {setSongPlay} from '../redux/action';
//var DomParser = require('react-native-html-parser').DOMParser;
class SearchScreen extends Component {
  constructor(props) {
    super(props);
    console.log('Constructor');
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      dataGoiY: [],
      dataSearch: [],
      hienThiGoiY: true,
      searchValue: '',
    };

    // if (valueForSearch.textForSearch !== '') {
    //     this.setState({ searchValue: valueForSearch });
    // }

    // if (isRequireForSearch)
    //     this.SearchFor(this.state.searchValue);
  }
  static navigationOptions = {
    header: null,
  };

  _loadImageFromURL(URL) {
    //console.log(valueSearch);
    get(URL).then(response => {
      console.log('reponse html:   ' + URL + response);
      //let doc = new DomParser().parseFromString(response,'text/html')
      //console.log(doc);
      //this.setState({dataGoiY : response.data.song,})
    });
  }

  _loadDataSearch(value) {
    if (value == '') {
      this.setState({dataSearch: []});
    } else {
      //value='hong nhan'
      //var valueSearch = this.state.searchValue;
      //console.log(valueSearch);
      //https://zingmp3.vn/api/search?type=song&q=bạc&start=0&count=20&ctime=1575083405&sig=4e2f8c458e8fe8516223757a0234ff84e6ea1381bfa7e242b69d3506b71b9d2becce29fec1ca25370fc6b3e1d2958f8c95bd8da5ac96951b73121105e0afbfea&api_key=38e8643fb0dc04e8d65b99994d3dafff
      fetch(
        'https://zingmp3.vn/api/search?type=song&q=' +
          value +
          '&start=0&count=20&ctime=1575083405&sig=4e2f8c458e8fe8516223757a0234ff84e6ea1381bfa7e242b69d3506b71b9d2becce29fec1ca25370fc6b3e1d2958f8c95bd8da5ac96951b73121105e0afbfea&api_key=38e8643fb0dc04e8d65b99994d3dafff',
      )
        .then(response => response.json())
        .then(response => {
          //console.log(response.data);

          this.setState({dataSearch: response.data.items});
        });
    }
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    // const newData = this.arrayholder.filter(function (item) {
    //     //applying filter for the inserted text in search bar
    //     const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
    //     const textData = text.toUpperCase();
    //     return itemData.indexOf(textData) > -1;
    // });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      //dataSource: newData,
      searchValue: text,
    });
  }

  SearchFor(text) {
    console.log("I'm searching for: " + text);
    this._loadDataSearch();
  }

  _loadGoiY(value) {
    //fetch('https://zingmp3.vn/api/search?type=song&q=em&start=0&count=5&ctime=1575083405&sig=4e2f8c458e8fe8516223757a0234ff84e6ea1381bfa7e242b69d3506b71b9d2becce29fec1ca25370fc6b3e1d2958f8c95bd8da5ac96951b73121105e0afbfea&api_key=38e8643fb0dc04e8d65b99994d3dafff')
    if (value == '') {
      console.log('null');
      this.setState({dataGoiY: []});
    } else {
      fetch(
        'https://ac.zingmp3.vn/suggestKeyword?num=5&query=+' +
          value +
          '&type=song',
      )
        .then(response => {
          return response.json();
        })
        .then(res => {
          this.setState({dataGoiY: res.data});
        });
    }
  }

  render() {
    var timeout = 500;
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <View style={styles.container}>
        <View
          style={{
            paddingTop: 0,
            marginBottom: 0,
            width: screenWidth,
            backgroundColor: '#fff',
          }}>
          <View>
            <SearchBar
              containerStyle={{backgroundColor: '#fff'}}
              value={this.state.searchValue}
              backgroundColor
              round
              lightTheme={true}
              searchIcon={{size: 24}}
              onChangeText={text => {
                this.setState({searchValue: text});
                //this._loadGoiY(text);

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                  this._loadGoiY(this.state.searchValue);
                }, 500);
              }}
              onClear={text => this.setState({searchValue: text, dataGoiY: []})}
              placeholder="Bạn muốn nghe gì...?"
              onSubmitEditing={text => {
                //clearTimeout(this.timeout);

                this.setState({dataGoiY: []});
                this._loadDataSearch(this.state.searchValue);
              }}
            />
            <View
              style={{
                backgroundColor: '#ffe',
                //  justifyContent:'center',
                // alignItems:'center',
                // alignContent:'center',

                zIndex: 2,
                padding: 0,
                marginLeft: 30,
                marginTop: 0,
                borderRadius: 0,
                borderWidth: 1,
                borderColor: '#000',
                width: '85%',
                //height:150
              }}>
              {/*Flatlist load goi y search*/}

              <FlatList
                //backgroundColor={"#000"}
                borderColor={'#000'}
                borderWidth={0}
                data={this.state.dataGoiY}
                zIndex={2}
                extraData={this.state.searchValue}
                //keyExtractor={(item)=>item}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({searchValue: item, dataGoiY: []}),
                        this._loadDataSearch(item);
                    }}>
                    <Text style={{fontSize: 15, color: '#000', marginLeft: 20}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                //keyExtractor={item => item}
              />
            </View>
          </View>
        </View>

        <View style={styles.container1}>
          {/*<Text style={styles.tieuDe}> Kết quả tìm kiếm:</Text>*/}

          <View style={styles.danhsach}>
            <FlatList
              data={this.state.dataSearch}
              extraData={this.state}
              renderItem={({item,index}) => (
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
                      this.props.setSongPlay(
                        item.id,
                        item.title,
                        item.artists_names,
                        item.lyric,
                        item.duration,
                      );
                    this.props.navigation.navigate('Stream');
                  }}>
                  <ItemInforBaiHat
                    stt={++index}
                    id={item.id}
                    title={item.title}
                    artists_names={item.artists_names}
                    image={item.thumbnail_medium}
                    lyric={item.lyric}
                    duration={item.duration}
                    colorItem={1}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <Text> haah</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {myCurrentSong: state.currentSong};
}

export default connect(null, {setSongPlay})(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  container1: {
    flex: 1,
    width: screenWidth * 0.95,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
});


