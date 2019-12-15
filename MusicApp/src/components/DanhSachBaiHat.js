import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Dimensions} from 'react-native';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
const screenWidth = Math.round(Dimensions.get('window').width);
import Player from '../player/Player';

import {connect} from 'react-redux';
import {setSongPlay} from '../redux/action';

class DanhSachBaiHat extends Component {
  constructor(props) {
    super(props);
    console.log('Constructor');
    this.state = {};
  }


  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <View style={styles.container}>
     
    
          {/*<Text style={styles.tieuDe}> Danh sach bai hat:</Text>*/}

          <View style={styles.danhsach}>
            <FlatList
              data={this.props.dataDanhSachBaiHat}
              extraData={this.state}
              initialNumToRender={5}
              maxToRenderPerBatch={6}
              windowSize={6}
              renderItem={({item, index}) => (
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
                    //this.props.navigation.navigate('Stream');
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
    );
  }
}

export default connect(null, {setSongPlay})(DanhSachBaiHat);

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