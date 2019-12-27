import TrackPlayer from 'react-native-track-player';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Slider from 'react-native-slider';
import RNFetchBlob from 'rn-fetch-blob';
const screenWidth = Math.round(Dimensions.get('window').width);
import Player, {MyLyric} from '../player/Player';

import {connect} from 'react-redux';
import {
  setPause,
  setPlay,
  setDataDanhSachDangNghe,
  setIndexPlayingInList,
  setSongPlay,
} from '../redux/action';
class ReLoadSong extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      loading:false,
      indexOf:0
    };
  }

  render() {
    
    //console.log("index: "+this.getProgress())

   // console.log("index static: "+Player.getIndex())
    //console.log("index of: "+this.state.indexOf)
    if(Player.getIndex()!=this.state.indexOf)
    {
      try {
        var obj = this.props.dataDanhSachDangNghe.dataSong[Player.getIndex()];
        this.props.setSongPlay(
        obj.id,
        obj.title,
        obj.artists_names,
        obj.lyric,
        obj.duration,
      );
      this.setState({indexOf:Player.getIndex()})
      console.log("reload: "+obj.title)
        
      } catch (error) {
        
      }

          
    }
    // if (
    //   parseInt(this.getProgress() * Player._getDuration()) >=
    //     Player._getDuration() - 1 &&
    //   Player._getDuration() != 0 &&!this.state.loading
      
    // ) 
   
    // {
    //   this.setState({loading:true})
    //   console.log('Het ' + this.getProgress() * Player._getDuration());
    //   Player._setPause();
    //   Player._setSeek(0);
    //   TrackPlayer.seekTo(0).then((value)=>{
        
    //     if (
    //       !(
    //         Player.typeLoop == 0 &&
    //         this.props.indexPlayingInList ==
    //           this.props.dataDanhSachDangNghe.dataSong.length
    //       )
    //     ) {
    //       // Player.PlayNext();
    //       this.props.setIndexPlayingInList(this.props.indexPlayingInList.val+1);
    //       var obj = this.props.dataDanhSachDangNghe.dataSong[
    //         this.props.indexPlayingInList.val
    //       ];
    //      // console.log(obj);
    //       if (obj.linkMp3 != null)
    //       {
    //         Player.PlayMusic(
    //           obj.id,
    //           obj.linkMp3,
    //           obj.title,
    //           obj.artists_names,
    //           obj.thumbnail_medium,
    //           obj.duration,
    //         )
    //       }
    //       else {
    //         Player.PlayMusic(
    //           obj.id,
    //           'http://api.mp3.zing.vn/api/streaming/audio/' + obj.id + '/128',
    //           obj.title,
    //           obj.artists_names,
    //           obj.thumbnail_medium,
    //           obj.duration,
    //         );
    //       }
    //       this.props.setSongPlay(
    //         obj.id,
    //         obj.title,
    //         obj.artists_names,
    //         obj.lyric,
    //         obj.duration,
    //       );
    //       this.props.setPlay();
    //       //Player._setPlay();
    //     }
    //     //them rang buoc neu no la lap 1 bai thi cho nó play lai
    //     if (Player.typeLoop == 2) {
    //       Player._setPlay();
    //     }
        

    //   })
      
    //   console.log('type loop 2 ' + Player.typeLoop);
    //   //console.log("index: "+this.props.indexPlayingInList.val)

    //   //Them rang buoc cho neu no la cai cuoi cung va no khong lap thi next (else dung hat)
    //   // if (
    //   //   !(
    //   //     Player.typeLoop == 0 &&
    //   //     this.props.indexPlayingInList ==
    //   //       this.props.dataDanhSachDangNghe.dataSong.length
    //   //   )
    //   // ) {
    //   //   // Player.PlayNext();
    //   //   this.props.setIndexPlayingInList(this.props.indexPlayingInList.val+1);
    //   //   var obj = this.props.dataDanhSachDangNghe.dataSong[
    //   //     this.props.indexPlayingInList.val
    //   //   ];
    //   //   console.log(obj);
    //   //   if (obj.linkMp3 != null)
    //   //     Player.PlayMusic(
    //   //       obj.id,
    //   //       obj.linkMp3,
    //   //       obj.title,
    //   //       obj.artists_names,
    //   //       obj.thumbnail_medium,
    //   //       obj.duration,
    //   //     );
    //   //   else {
    //   //     Player.PlayMusic(
    //   //       obj.id,
    //   //       'http://api.mp3.zing.vn/api/streaming/audio/' + obj.id + '/128',
    //   //       obj.title,
    //   //       obj.artists_names,
    //   //       obj.thumbnail_medium,
    //   //       obj.duration,
    //   //     );
    //   //   }
    //   //   this.props.setSongPlay(
    //   //     obj.id,
    //   //     obj.title,
    //   //     obj.artists_names,
    //   //     obj.lyric,
    //   //     obj.duration,
    //   //   );
    //   //   //this.props.setPlay();
    //   //   //Player._setPlay();
    //   // }
    //   //them rang buoc neu no la lap 1 bai thi cho nó play lai
    //   // if (Player.typeLoop == 2) {
    //   //   Player._setPlay();
    //   // }
    // }


    return (
      <View>      
      </View>
    );
  }
}

// const MyComponent = () => {
//   const { position, bufferedPosition, duration } = useTrackPlayerProgress()

//   return (
//     <View>
//       <Text>Track progress: {position} seconds out of {duration} total</Text>
//       <Text>Buffered progress: {bufferedPosition} seconds buffered out of {duration} total</Text>
//     </View>
//   )
// }

function mapStateToProps(state) {
  return {
    myCurrentSong: state.currentSong,
    isPause: state.isPause,
    dataDanhSachDangNghe: state.dataDanhSachDangNghe,
    indexPlayingInList: state.indexPlayingInList,
  };
}
export default connect(mapStateToProps, {
  setPause,
  setPlay,
  setIndexPlayingInList,
  setSongPlay,
})(ReLoadSong);

const styles = StyleSheet.create({
  containerProc: {
    flex: 0.6,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0abde320',
    flexDirection: 'row',
    width: screenWidth,
  },
  con1: {
    width: '100%',
    height: 30,
    fontSize: 17,
    color: '#10ac84',
    textShadowColor: '#48dbfb',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 15,
    textAlign: 'center',
    marginTop: 0,
  },
  con2: {
    width: '100%',
    height: 30,
    fontSize: 17,
    color: '#341f97',
    textShadowColor: '#48dbfb',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 15,
    textAlign: 'center',
    marginTop: 0,
  },
});
