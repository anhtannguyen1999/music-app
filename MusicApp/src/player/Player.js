import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Slider from 'react-native-slider';
import RNFetchBlob from 'rn-fetch-blob'
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Player {
  static KhoiTaoPlayer() {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
    TrackPlayer.addEventListener('remote-next', () => {
      console.log(TrackPlayer.getCurrentTrack());
      console.log(TrackPlayer.getDuration());
      console.log(TrackPlayer.getPosition());
      console.log(TrackPlayer.getQueue());
      console.log(TrackPlayer.getRate());
      console.log(TrackPlayer.getState());
      console.log(TrackPlayer.getTrack());
      console.log(TrackPlayer.getVolume());
      //console.log(TrackPlayer.reset());
      console.log(TrackPlayer);
      TrackPlayer.skipToNext();
    });
    TrackPlayer.addEventListener('remote-previous', () =>
      TrackPlayer.skipToPrevious(),
    );
    TrackPlayer.updateOptions({
      // One of RATING_HEART, RATING_THUMBS_UP_DOWN, RATING_3_STARS, RATING_4_STARS, RATING_5_STARS, RATING_PERCENTAGE
      ratingType: TrackPlayer.RATING_5_STARS,

      // Whether the player should stop running when the app is closed on Android
      stopWithApp: false,

      // An array of media controls capabilities
      // Can contain CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_STOP, CAPABILITY_SEEK_TO,
      // CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS, CAPABILITY_SET_RATING
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,

        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],

      // An array of capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,

        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],

      // Icons for the notification on Android (if you don't like the default ones)
      playIcon: require('../../res/ic_play.png'),
      pauseIcon: require('../../res/ic_pause.png'),
      stopIcon: require('../../res/ic_stop_tmp.png'),
      previousIcon: require('../../res/ic_pre.png'),
      nextIcon: require('../../res/ic_next.png'),
      icon: require('../../res/ic_notifi.png'), // The notification icon
    });
  }
  static daKhoiTao = false;
  static duration = 0;
  static _getDuration() {
    return this.duration;
  }

  static _setPause() {
    TrackPlayer.pause();
  }
  static _setPlay() {
    TrackPlayer.play();
  }
  static _setSeek(value) {
    TrackPlayer.seekTo(value);
  }
  static _getProg()
  {
     return TrackPlayer.getProgress();
  }
  static _getCurentTime()
  {
    return parseInt(this._getProg()*this._getDuration());
  }
  static PlayMusic(id, url, title, artist, artwork, total_time) {
    /*if (this.daKhoiTao == false) {
      this.daKhoiTao = true;
    }*/
    this.KhoiTaoPlayer();

    this.duration = parseInt(total_time);
    TrackPlayer.setupPlayer().then(async () => {
      // Adds a track to the queue

      await TrackPlayer.add({
        id: id,
        url: url,
        title: title,
        artist: artist,
        artwork: artwork,
      });
      console.log(
        'add ' +
          title +
          '   TotalTime: ' +
          this.duration +
          ' OK! _dakhoitao' +
          this.daKhoiTao,
      );
      // Starts playing it
      //TrackPlayer.seekTo(10.5);// tua den 10.5s
      TrackPlayer.play();
      console.log(TrackPlayer.getBufferedPosition());
      //TrackPlayer.pause();
      //TrackPlayer.setRate(2);//tang toc do len 1.25
      // TrackPlayer.seekTo(10.5);// tua den 10.5s
    });
  }
}

export class PlayerInfo extends Component {
  componentDidMount() {
    // Adds an event handler for the playback-track-changed event
    this.onTrackChange = TrackPlayer.addEventListener(
      'playback-track-changed',
      async data => {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        this.setState({trackTitle: track.title});
      },
    );
  }

  componentWillUnmount() {
    // Removes the event handler
    this.onTrackChange.remove();
  }

  render() {
    return <Text>{this.state.trackTitle}</Text>;
  }
}

export class MyPlayerBar extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  render() {
    return (
      <View style={styles.containerProc}>
        <Slider
          
          width={screenWidth - 80}
          marginBottom={0}
          value={this.getProgress()}
          onSlidingComplete={time =>
            Player._setSeek(parseInt(Player._getDuration() * time))
          }></Slider>
        <Text fontSize={15}>
          {' '}
          {parseInt((this.getProgress() * Player._getDuration()) % 60) < 10
            ? parseInt((this.getProgress() * Player._getDuration()) / 60) +
              ':' +
              '0' +
              parseInt((this.getProgress() * Player._getDuration()) % 60, 10)
            : parseInt((this.getProgress() * Player._getDuration()) / 60) +
              ':' +
              parseInt((this.getProgress() * Player._getDuration()) % 60, 10)}
          /
          {parseInt(Player._getDuration() % 60) < 10
            ? parseInt(Player._getDuration() / 60) +
              ':' +
              '0' +
              parseInt(Player._getDuration() % 60, 10)
            : parseInt(Player._getDuration() / 60) +
              ':' +
              parseInt(Player._getDuration() % 60, 10)}
        </Text>
      </View>
    );
  }
}

export class MyLyric extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
    this.state = {
      data_temp: [],
      tempString: '',
      stringLyric: '',
      index:'',
      curentTime:0,
      up:0,
      link:''
    };
   
  }
  componentDidMount() {

/*console.log("set linK liric "+this.props.linkLyric)
   fetch(this.props.linkLyric)
    .then(response => {
      return response.text();
    })
    .then(res => {

     this.setState({stringLyric: res});
     this.xuLiLyric(this.state.stringLyric)

    });  */
  }

  xuLiLyric(input)
  {
    //console.log(this.state.stringLyric+"uuu")
    var value=new String();
    value=input+"[";
    var start=0;
    var end=0;
    var data = [];
    //data['00:00']='haha'
      for(let i=0;i<input.length;i++)
      {

        if(value[i]=="[")
        {
          end=i;
          var line =value.substring(start,end);
          var time =line.substring(1,6);
          var obj={id: time,value:line.substring(10,line.length-2)}
          //data[time]= line.substring(10,line.length-2);
          data.push(obj);
          start=end;
        }
      }
     // console.log(data);
      this.setState({data_temp:data})
      console.log("LOAD data lyric OK!")
  }

  _stringToTime(value1)
  {
    var value =new String();
    value=value1;
    return parseInt(value.substring(0,2))*60 +parseInt(value.substring(3,6));
  }


  render() {


    //this.xuLiLyric(this.state.stringLyric)
    //console.log(this.state.data_temp)
    if(this.props.linkLyric!=this.state.link)
    {
      this.setState({link:this.props.linkLyric})
      this.setState
    console.log("set linK liric "+this.props.linkLyric.substring(0,4))
    if(this.props.linkLyric.substring(0,4)=='http')
    {
      fetch(this.props.linkLyric)
      .then(response => {
        return response.text();
      })
      .then(res => {
  
       this.setState({stringLyric: res});
       this.xuLiLyric(this.state.stringLyric)
  
      }); 
    }
    else
    {
      RNFetchBlob.fs.readFile(this.props.linkLyric,'utf8').then((data)=>{
        this.setState({stringLyric: data});
        this.xuLiLyric(this.state.stringLyric)
      })
    }

    }
    return (
      <View style={styles.container}>
        {/*<TouchableOpacity  onPress={()=>{this._showLyric(),this._renderText('hahaah')}}> 
        <Text style={{fontSize:20}}> Render </Text>       
        </TouchableOpacity>*/}
        <FlatList
        data={this.state.data_temp}
        extraData={this.state.data_temp}
        renderItem={({item})=>(
     

      <TouchableOpacity onPress={()=>{Player._setSeek(this._stringToTime(item.id))}}>   
        <Text style={(parseInt(this.getProgress*Player._getDuration())-this._stringToTime(item.id))==0? styles.con1:styles.con2}>    [{item.id}]   {item.value}</Text>   
        </TouchableOpacity>)
        }
        >
        </FlatList>
           
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerProc: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f55',
    flexDirection: 'row',
    width: screenWidth,
  },
  con1:{
    width:"100%",
    fontSize:15, 
    color:"#000",
  },
  con2:{
    width:"100%",
     fontSize:15, 
    color:"#F45"
  }
});
