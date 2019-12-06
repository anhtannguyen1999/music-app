import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Dimensions} from 'react-native';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
const screenWidth = Math.round(Dimensions.get('window').width);
import Player, {MyPlayerBar} from '../player/Player';
import StreamScreen from '../screens/Stream';
//var DomParser = require('react-native-html-parser').DOMParser;
export default class SearchScreen extends Component {
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

  static _name = '';
  static _song = '';

  static _setNameSong(valueName, valueSong) {
    (SearchScreen._name = valueName), (SearchScreen._song = valueSong);

    console.log('setname: ' + SearchScreen._name + ' song ok!');
  }

  static _getSong() {
    console.log('return name ok!');
    return SearchScreen._song;
  }

  static _getname() {
    return StreamScreen._name;
  }

  /* UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('mount');
  }*/

  _loadImageFromURL(URL) {
    //console.log(valueSearch);
    get(URL).then(response => {
      console.log('reponse html:   ' + URL + response);
      //let doc = new DomParser().parseFromString(response,'text/html')
      //console.log(doc);
      //this.setState({dataGoiY : response.data.song,})
    });
  }

  _loadGoiYsearch() {
    //value='hong nhan'
    var valueSearch = this.state.searchValue;
    //console.log(valueSearch);
    //https://zingmp3.vn/api/search?type=song&q=bạc&start=0&count=20&ctime=1575083405&sig=4e2f8c458e8fe8516223757a0234ff84e6ea1381bfa7e242b69d3506b71b9d2becce29fec1ca25370fc6b3e1d2958f8c95bd8da5ac96951b73121105e0afbfea&api_key=38e8643fb0dc04e8d65b99994d3dafff
    fetch(
      'https://zingmp3.vn/api/search?type=song&q=' +
        valueSearch +
        '&start=0&count=20&ctime=1575083405&sig=4e2f8c458e8fe8516223757a0234ff84e6ea1381bfa7e242b69d3506b71b9d2becce29fec1ca25370fc6b3e1d2958f8c95bd8da5ac96951b73121105e0afbfea&api_key=38e8643fb0dc04e8d65b99994d3dafff',
    )
      .then(response => response.json())
      .then(response => {
        //console.log(response.data);

        this.setState({dataSearch: response.data.items});
      });
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
    this._loadGoiYsearch();
  }

  _loadGoiYSearch2(value) {
    //fetch('https://zingmp3.vn/api/search?type=song&q=em&start=0&count=5&ctime=1575083405&sig=4e2f8c458e8fe8516223757a0234ff84e6ea1381bfa7e242b69d3506b71b9d2becce29fec1ca25370fc6b3e1d2958f8c95bd8da5ac96951b73121105e0afbfea&api_key=38e8643fb0dc04e8d65b99994d3dafff')
    if (value == '') {
      console.log('null');
      this.setState({dataGoiY: []});
      return null;
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
    //console.log('Render');

    //const {navigation} = this.props;
    //const valueForSearch = JSON.stringify(
      //navigation.getParam('textForSearch', ''),
    
    //console.log(valueForSearch);
    //const isRequireForSearch = JSON.stringify(
     // navigation.getParam('isRequireForSearch', false),
   // );
    //console.log(isRequireForSearch);

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
                this._loadGoiYSearch2(text);
              }}
              onClear={text => this.setState({searchValue: '', dataGoiY: []})}
              placeholder="Bạn muốn nghe gì...?"
              onSubmitEditing={text => {
                this._loadGoiYsearch(text),
                  this.setState({dataGoiY: [], searchValue: text});
              }}
            />
            <View
              style={{
                backgroundColor: '#fff',
                zIndex: 2,
                padding: 0,
                margin: 0,
                marginTop: 0,
                borderRadius: 0,
                borderColor: '#f0f',
              }}>
              <FlatList
                //backgroundColor={"#000"}
                borderColor={'#000'}
                data={this.state.dataGoiY}
                zIndex={2}
                extraData={this.state}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {searchValue: item},
                        this.setState({dataGoiY: []}),
                        this.SearchFor(item),
                      );
                    }}>
                    <Text style={{fontSize: 15, color: '#000'}}> {item}</Text>
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
              renderItem={({item}) => (
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

                      StreamScreen._setNameSong(item.title, item.artists_names);

                    this.props.navigation.navigate('Stream');
                  }}>
                  <ItemInforBaiHat
                    ten={item.title}
                    casi={item.artists_names}
                    image={item.thumbnail}
                    time={
                      parseInt(item.duration % 60) < 10
                        ? parseInt(item.duration / 60) +
                          ':' +
                          '0' +
                          parseInt(item.duration % 60, 10)
                        : parseInt(item.duration / 60) +
                          ':' +
                          parseInt(item.duration % 60, 10)
                    }
                    colorItem={1}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    );
  }
}

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
