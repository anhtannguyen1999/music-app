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
const screenWidth = Math.round(Dimensions.get('window').width);
export default class StreamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      repeat: false,
      random: false,
      rerender: true,
      margindelay_: screenWidth / 2,
      toLeft: true,
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

  static _name = '';
  static _song = '';
  static _linkLyric='';

  static _setNameSong(valueName, valueSong) {
    (StreamScreen._name = valueName), (StreamScreen._song = valueSong);

    console.log('setname: ' + StreamScreen._name + ' song ok!');
  }
  static _setLinkLyric(valueLink)
  {
    StreamScreen._linkLyric=valueLink;
  }

  static _getSong() {
    console.log('return name ok!');
    return StreamScreen._song;
  }

  static _getname() {
    return StreamScreen._name;
  }

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
    var scPause = this.state.pause ? play : pause;
    return <Image width={20} resizeMode="cover" source={scPause}></Image>;
  }
  componentDidMount() {
    /*const _name= this.props.navigation.getParam('name',"................");
  const _song = this.props.navigation.getParam('song',"``````````````");
  this.setState(
    {_name:_name,
    _song:_song}
  )*/
  }

  render() {
    //const { navigation } = this.props;
    //const moveL = this.state.margindelay_;
    return (
      <View style={styles.container}>
                {/* <View
            style={{
              flex:0.5,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: screenWidth,
              height: 10,
              marginLeft: moveL,
              backgroundColor: '#123',
              width:screenWidth
            }}>
            <Text style={{fontSize: 15, color: 'white'}}>
              {StreamScreen._name}
            </Text>
            <Text style={{fontSize: 15, color: 'white'}}>
              {StreamScreen._song}{' '}
            </Text>
          </View>*/}
         
        <View style={styles.con2}>
          
        <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={true} onMomentumScrollEnd={()=>{}}>

          
          <View style={{flex:1,width:screenWidth}}   backgroundColor="#456">
          
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
              {StreamScreen._name}
            </Text>
            <Text style={{fontSize: 15, color: '#fff'}}>
              Singer:
              {StreamScreen._song}{' '}
            </Text>
          </View>


          </View>

          <View style={{flex:1,width:screenWidth}}  backgroundColor="#321">
          <MyLyric linkLyric = {StreamScreen._linkLyric}>  </MyLyric>
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
              <View flex={1}></View>
            </View>

            <View style={{flex: 2.5, flexDirection: 'row'}}>
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

export class NameSong extends Component {
  render() {
    return (
      <Text style={{fontSize: 25, color: 'white', paddingTop: 0}}>
        {this.props.Name_}--{this.props.Song_}{' '}
      </Text>
    );
  }
}
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
