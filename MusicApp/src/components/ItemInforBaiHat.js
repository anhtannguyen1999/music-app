import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSongPlay, setDataAllPlayList} from '../redux/action';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {FlatList} from 'react-native-gesture-handler';

const screenWidth = Math.round(Dimensions.get('window').width);

class ItemInforBaiHat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      fadeAni: new Animated.Value(0),
      upPopup: false,
      upPopupAdd: false,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAni, {
      toValue: 100,
      duration: 5000,
    }).start();
  }

  _renderUpPoupAdd() {}

  render() {
    const valueOpa = this.state.fadeAni;
    return (
      <View
        style={{
          flex: 1,
          width: screenWidth * 0.87,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 5,
          marginLeft: 5,
          backgroundColor: '#ccc',
        }}>
        <View>
          <Text
            style={this.props.Stt < 10 ? styles.styleStt0 : styles.styleStt1}>
            {this.props.stt}{' '}
          </Text>
        </View>

        <View style={{flex: 1, width: '100%'}} onPress={() => {}}>
          <Image
            loadingIndicatorSource={require('../../res/m_musicicon.png')}
            style={styles.imageStyle}
            source={
              this.props.image === 'url' || this.state.isError
                ? require('../../res/m_musicicon.png')
                : {uri: this.props.image}
            }
            onError={e => this.setState({isError: true})}></Image>
          {/* <Image style={styles.imageStyle} source={{ uri: 'http://avatar.nct.nixcdn.com/song/2019/10/02/3/1/4/d/1570008789331.jpg' }}></Image> */}
        </View>

        <View style={styles.inforStyle}>
          <TouchableOpacity
            onPress={() => {
              this.props.setSongPlay(
                this.props.id,
                this.props.title,
                this.props.artists_names,
                this.props.lyric,
                this.props.duration,
              );
            }}>
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
              style={{fontStyle: 'italic', fontWeight: 'normal', fontSize: 13}}>
              {this.props.artists_names + ''}
            </Text>
            <Text
              style={{fontStyle: 'italic', fontWeight: 'normal', fontSize: 10}}>
              {parseInt(this.props.duration % 60) < 10
                ? parseInt(this.props.duration / 60) +
                  ':' +
                  '0' +
                  parseInt(this.props.duration % 60, 10)
                : parseInt(this.props.duration / 60) +
                  ':' +
                  parseInt(this.props.duration % 60, 10)}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setState({upPopup: true});
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

        <Modal
          isVisible={this.state.upPopup}
          onBackdropPress={() => {
            this.setState({upPopup: false});
          }}>
          <View style={{backgroundColor: '#aaa', height: 300}}>
            <Button
              title={this.props.title}
              onPress={() => {
                this.setState({upPopup: false});
              }}></Button>
            <View style={{flexDirection: 'row', margin: 20}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({upPopupAdd: true});
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                  }}>
                  <Icon name="add-to-list" size={30}></Icon>
                  <Text>Thêm vào Playlist</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
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
            </View>
          </View>
        </Modal>

        {/* popup Addd*/}
        <Modal
          isVisible={this.state.upPopupAdd}
          onBackdropPress={() => {
            this.setState({upPopupAdd: false});
          }}>
          <View style={{backgroundColor: '#fff',height: 280}}>
            <Button
              title={'Chọn playlist để thêm'}
              onPress={() => {
                this.setState({upPopupAdd: false});
              }}></Button>
            <View style={{flex:1, margin: 0}}>
             
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin:5,
                  }}>                
                  <FlatList
                    data={this.props.dataAllPlaylist.list}
                    renderItem={({item, index}) => (
                      <View style={{flex:1,width:'100%', alignContent:'center',marginBottom:5,borderWidth:2,borderColor:"red",borderRadius:3,backgroundColor:"#aaa"}}>
                        <Text style={{fontSize:18}}>   {item.title}</Text>
                        <Image source={{uri:item.thumbnail_medium}} style={{width:20,height:20}}></Image>
                      </View>
                      
                    )}></FlatList>
                </View>
              
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  // https://facebook.github.io/react-native/docs/flatlist
}

function mapStateToProps(state) {
  return {
    myCurrentSong: state.currentSong,
    dataAllPlaylist: state.dataAllPlaylist,
  };
}

export default connect(mapStateToProps, {setSongPlay, setDataAllPlayList})(
  ItemInforBaiHat,
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
    borderRadius: 3,
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
