import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Player, {MyPlayerBar,MyLyric} from '../player/Player';
import play from '../../res/play_.png';
import pause from '../../res/pause_.png';
import Icon from 'react-native-vector-icons/FontAwesome';


import { connect } from 'react-redux';
import { setSongPlay  } from '../redux/action';

const screenWidth = Math.round(Dimensions.get('window').width);
class StreamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      repeat: false,
      random: false,
      rerender: true,
      margindelay_: screenWidth / 2,
      toLeft: true,
      nameSong:'',
      rerender:0,
    };
   /* setInterval(() => {
      if (this.state.margindelay_ <= -screenWidth)
        this.setState({toLeft: false});
      if (this.state.margindelay_ >= screenWidth)
        this.setState({toLeft: true});

      if (this.state.toLeft) var temp = this.state.margindelay_ - 2;
      else {
        var temp = this.state.margindelay_ + 2;
      }
      this.setState({
        margindelay_: temp,
      });
    }, 35);*/
  }
  static navigationOptions = {
    header: null,
  };


  _setPause() {
    if (this.state.pause == true) {
      this.setState({pause: false});
      Player._setPlay();
    } else {
      this.setState({pause: true});
      Player._setPause();
    }
    console.log(this.state.pause);
  }

  _renderButtonPause() {
    if(this.state.pause==false)
     return <Icon name={'pause-circle-o'} size={70} color={'#fff'} ></Icon>
     else
     return <Icon name={'play-circle-o'} size={70} color={'#fff'} ></Icon>

  }
  componentDidMount() {
  }

  render() {

    return (
      <View style={styles.container}>


         
        <View style={styles.con2}>
          
        <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={true}  >

          <View style={{flex:1,width:screenWidth}}   backgroundColor="#000">
          
          <View
            style={{
              flex:0.08,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: screenWidth,
              height: 10,
              marginLeft: 10,
              backgroundColor: '#000',
              width:screenWidth
            }}>
            <Text style={{fontSize: 15, color: '#fff'}}>
              Song:
              {this.props.myCurrentSong.title}
            </Text>
            <Text style={{fontSize: 15, color: '#fff'}}>
              Singer:
              {this.props.myCurrentSong.artists_names}{' '}
            </Text>
          </View>


          </View>

          <View style={{flex:1,width:screenWidth}}  backgroundColor="#321">
             <MyLyric linkLyric = {this.props.myCurrentSong.lyric}>  </MyLyric>
          </View>
          </ScrollView>
        </View>
       



        <View style={styles.con1}>
          <MyPlayerBar></MyPlayerBar>

          <View style={styles.containerButton}>

            <View flex={1}>
              <TouchableOpacity flex={1}>
                <Image                
                  resizeMode="center"
                  source={
                    this.props.pause
                      ? require('../../res/shuffle.png')
                      : require('../../res/shuffle.png')
                  }></Image>
              </TouchableOpacity>
              
              
            </View>

            <View style={{flex: 2.5, flexDirection: 'row'}}>
              <Text style={{fontSize:20}}> </Text>
              <TouchableOpacity>
                <Image
                  resizeMode="center"
                  source={require('../../res/prev.png')}></Image>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this._setPause();
                }}>
                {this._renderButtonPause()}
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  resizeMode="center"
                  source={require('../../res/next.png')}></Image>
              </TouchableOpacity>
            </View>

            <View flex={1}>
              <TouchableOpacity>
                <Image
                  resizeMode="center"
                  source={require('../../res/repeat.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return { myCurrentSong: state.currentSong };
}
export default connect(mapStateToProps, {setSongPlay})(StreamScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  con1: {
    flex: 1.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  con2: {
    width:screenWidth,
    flex: 5,
  },

  containerButton: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#054',
    flexDirection: 'row',
    width: screenWidth,
  },
  containerProc: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: screenWidth,
  },
});
