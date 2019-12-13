import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Dimensions} from 'react-native';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
const screenWidth = Math.round(Dimensions.get('window').width);
import Player, {MyPlayerBar} from '../player/Player';
import PlayList from '../components/PlayList';

import {connect} from 'react-redux';
import {setSongPlay, setPlayListOnline} from '../redux/action';
//var DomParser = require('react-native-html-parser').DOMParser;
class SongPlayListScreen extends Component {
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
        <View style={styles.container,{margin:0,marginLeft:0,borderWidh:2,borderColor:'#000'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              loadingIndicatorSource={require('../../res/m_musicicon.png')}
              style={styles.imageStyle}
              source={{
                uri: this.props.navigation.getParam('thumbnail_medium', 0),
              }}
              onError={e => {}}></Image>
            <View>
              <Text style={{fontSize: 17}}>   
                {this.props.myPlayListOnline.dataSong.title}
              </Text>
              <Text style={{fontSize: 15}}>
                {parseInt(this.props.navigation.getParam('numberSong', 0))} bài
              </Text>

              <Text style={{fontSize: 15}}>
                {'Lượt nghe: '}
                {this.props.myPlayListOnline.dataSong.listen}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container1}>
          {/*<Text style={styles.tieuDe}> Kết quả tìm kiếm:</Text>*/}

          <View style={styles.danhsach}>
            <FlatList
              data={this.props.myPlayListOnline.dataSong.song.items}
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
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {myPlayListOnline: state.currentPlayListOnline};
}

export default connect(mapStateToProps, {setSongPlay})(SongPlayListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  container1: {
    flex: 2,
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
  imageStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 135,
    height: 135,
    margin: 3,
    padding:0,
    resizeMode: 'center',
    borderRadius: 3,
    borderColor:'#000',
    borderWidth:2
  },
});
