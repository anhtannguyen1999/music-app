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
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Math.round(Dimensions.get('window').width);
export default class Player {
  
  static KhoiTaoPlayer() {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
    TrackPlayer.addEventListener('remote-next', () => {
      // console.log(TrackPlayer.getCurrentTrack());
      // console.log(TrackPlayer.getDuration());
      // console.log(TrackPlayer.getPosition());
      // console.log(TrackPlayer.getQueue());
      // console.log(TrackPlayer.getRate());
      // console.log(TrackPlayer.getState());
      // console.log(TrackPlayer.getTrack());
      // console.log(TrackPlayer.getVolume());
      //console.log(TrackPlayer.reset());
      // console.log(TrackPlayer);
      // TrackPlayer.skipToNext();
      this.PlayNext();
    });
    TrackPlayer.addEventListener('remote-previous', () =>{
      //TrackPlayer.skipToPrevious(),
     this.PlayPre();
    }
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
        //TrackPlayer.CAPABILITY_STOP,

        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],

      // An array of capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,

        //TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        
      ],

      // Icons for the notification on Android (if you don't like the default ones)
      // playIcon: require('../../res/ic_play.png'),
      // pauseIcon: require('../../res/ic_pause.png'),
      // stopIcon: require('../../res/ic_stop_tmp.png'),
      // previousIcon: require('../../res/ic_pre.png'),
      // nextIcon: require('../../res/ic_next.png'),
      // icon: require('../../res/ic_notifi.png'), // The notification icon
    });
  }

  static PlayNext(){
    if (this.playingList.length>1)
    {
      console.log(this.typeNext);
      if (this.typeNext == 0) { //phat tuan tu
        //console.log("Next to: " + (this.playingIndexList - 1 + 1) % this.playingList.length + 1);
        //this.playingIndexList=((this.playingIndexList - 1 + 1) % this.playingList.length + 1);
        console.log("Next to index: "+this.playingIndexList)
        this.PlayMusicAtIndex((this.playingIndexList - 1 + 1) % this.playingList.length+1);
      }
      else { //phat ngau nhien
        let ranNum = Math.floor(Math.random() * this.playingList.length);
        this.PlayMusicAtIndex(ranNum)+1;
      }
    }
    
  }
  static PlayPre() {
    if (this.playingList.length > 1){
      if (this.typeNext == 0) { //phat tuan tu
       // console.log("Pre to: " + (this.playingIndexList - 1 - 1 + this.playingList.length) % this.playingList.length + 1);
       this.PlayMusicAtIndex((this.playingIndexList - 1 - 1 + this.playingList.length) % this.playingList.length + 1)
        //console.log("Next to: "+this.PlayMusicAtIndex((this.playingIndexList - 1 - 1 + this.playingList.length) % this.playingList.length + 1));
      }
      else { //phat ngau nhien
        let ranNum = Math.floor(Math.random() * this.playingList.length) + 1;
        this.PlayMusicAtIndex(ranNum);
      }
    }
    
  }


  static daKhoiTao = false;
  static duration = 0;
  static _getDuration() {
    try{
      TrackPlayer.getDuration().then(res => {
        if (this.duration != parseInt(res + "")){
          //console.log('a');
          this.duration = parseInt(res + "");
        }
      });
      
    }catch(e){
      
    }
    return this.duration;
  }

  static getIndex()
  {
    return Player.playingIndexList;
  }
  static getKindMusic()
  {
    return Player.kindOfMusicPlaying;
  }

  static _setPause() {
    TrackPlayer.pause();
  }
  static _setPlay() {
    TrackPlayer.play();
  }
  static _setSeek(value) {
    TrackPlayer.seekTo(value)
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
    if (this.daKhoiTao == false) {
      this.daKhoiTao = true;
      this.KhoiTaoPlayer();
    }

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
      
      //console.log(TrackPlayer.getBufferedPosition());
      //TrackPlayer.pause();
      //TrackPlayer.setRate(2);//tang toc do len 1.25
      // TrackPlayer.seekTo(10.5);// tua den 10.5s
    }).then(()=>{TrackPlayer.play();})
  }

  static typeLoop= 0; //==0 la khong lap lai,==1 la lap lai khi het, ==2 la lap lai 1 bai
  static typeNext= 0; //==0 la phat bai ke tiep tuan tu, ==1 la phat ngau nhien
  static GetTypeLoop(){
    console.log('type loop: '+this.typeLoop);
    return this.typeLoop;
  }
  static NextTypeLoop(){
    this.typeLoop=(this.typeLoop+1)%3;
    console.log('type loop: '+this.typeLoop);
  }
  static NextTypeNext() {
    this.typeNext = (this.typeNext + 1) % 2;
    console.log(this.typeNext);
  }
  static _setRate(value)
  {
    TrackPlayer.setRate(value);
  }

  static playingList = [];
  static playingIndexList=0;
  static kindOfMusicPlaying='';
  static PlayMusicAtIndex(index){
    let i=-1;
    this.playingList.forEach(element => {
      i++;
      if(i==index){
       // this.PlayMusic(element.id, element.url, element.title, element.artist, element.artwork, element.total_time);
        if (element.linkMp3 != null) {
          this.PlayMusic(
            element.title,
            element.linkMp3,
            element.title,
            element.artists_names,
            element.thumbnail_medium,
            element.duration,
          )
        }
        else {
          this.PlayMusic(
            element.title,
            'http://api.mp3.zing.vn/api/streaming/audio/' +
            element.id +
            '/128',
            element.title,
            element.artists_names,
            element.thumbnail_medium,
            element.duration,
          )
        };
      }
    });
    this.playingIndexList=index;
  }
  static AddASongToPlayingList(id, url, title, artist, artwork, total_time, lyric) {
    this.playingList.push({ id, url, title, artist, artwork, total_time, lyric});
    console.log(this.playingList);
    
  }
  static ClearPlayingList(){
    this.playingList=[];
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
    if (parseInt(this.getProgress() * Player._getDuration()) >= Player._getDuration() && Player._getDuration()!=0){ 
      //console.log('Het ' + this.getProgress() * Player._getDuration());
      Player._setSeek(0);
      Player._setPause();
      console.log('type loop 2 '+Player.typeLoop);
      if(Player.typeLoop==0)
      {
        return(<View></View>)
      }
      //Them rang buoc cho neu no la cai cuoi cung va no khong lap thi next (else dung hat)


      else {
        // if (!(Player.typeLoop == 0 && Player.playingIndexList == Player.playingList.length))
        if(Player.typeLoop==1)
         {
          Player.PlayNext();
          Player._setPlay(); 
        }
        //them rang buoc neu no la lap 1 bai thi cho nó play lai
        else if(Player.typeLoop==2){
          Player._setPlay();
        }

      }

      

    }
    //else console.log('con');

    var currTime = ( parseInt((this.getProgress() * Player._getDuration()) % 60) < 10
                ? parseInt((this.getProgress() * Player._getDuration()) / 60) +
                ':' +
                '0' +
                parseInt((this.getProgress() * Player._getDuration()) % 60, 10)
                : parseInt((this.getProgress() * Player._getDuration()) / 60) +
                ':' +
                parseInt((this.getProgress() * Player._getDuration()) % 60, 10));
    SetCurrentTime(currTime);
    return (
      
      <View style={styles.containerProc}>
        
        <Slider
           minimumTrackTintColor='white'
           thumbTintColor='white'
          width={screenWidth - 80}
          marginBottom={0}
          value={this.getProgress()}
          onSlidingComplete={time =>
            Player._setSeek(parseInt(Player._getDuration() * time))
          }></Slider>
        <Text fontSize={15} style={{ color:'#341f97'}}>
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
function SetCurrentTime(time){
  
  if(time.length<5)
    time='0'+time;
  this.setState({ curentTime: time});
}

const MyComponent = () => {
  const { position, bufferedPosition, duration } = useTrackPlayerProgress()

  return (
    <View>
      <Text>Track progress: {position} seconds out of {duration} total</Text>
      <Text>Buffered progress: {bufferedPosition} seconds buffered out of {duration} total</Text>
    </View>
  )
}

export class MyLyric extends TrackPlayer.ProgressComponent {

  constructor(props) {
    super(props);
    this.state = {
      data_temp: [],
      tempString: '',
      stringLyric: '',
      index:'',
      curentTime:'0',
      up:0,
      link:'',
    };
    this.curentLineIndex=0;
    SetCurrentTime = SetCurrentTime.bind(this);
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
      //console.log("LOAD data lyric OK!")
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
      
      console.log('LYRC: ='+this.props.linkLyric+'=');
      if (this.props.linkLyric == '' || (this.props.linkLyric + '').includes('lrc-nct')){
        console.log("lyrc k co nha! ..............");
        this.setState({ stringLyric: '' });
        this.xuLiLyric(this.state.stringLyric);
      }
        
      else if(this.props.linkLyric.substring(0,4)=='http')
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

    //console.log(this.state.curentTime);
    let i=0;
    if (this.props.linkLyric == '' || (this.props.linkLyric + '').includes('lrc-nct')) {
      return(
        <View></View>
      );
    }else
    return (
      <View style={styles.container}>
        {/*<TouchableOpacity  onPress={()=>{this._showLyric(),this._renderText('hahaah')}}> 
        <Text style={{fontSize:20}}> Render </Text>       
        </TouchableOpacity>*/}
        <FlatList
        scrollEnabled={true}
        data={this.state.data_temp}
        extraData={this.state.link}
        ref={(ref) => { this.flatListRef = ref; }}
        getItemLayout={(data, index) => (
          { length: 40, offset:24 * index, index }
        )}
        initialScrollIndex={1}
        renderItem={
          ({ item }) => { 
            i++;
            //gan dong hien tai
            if (item.id == this.state.curentTime){
              this.curentLineIndex=i;
              //console.log(this.curentLineIndex);
              try{
                this.flatListRef.scrollToIndex({ animated: true, index: this.curentLineIndex });
              }catch(e){}
              
            }
             return (<TouchableOpacity onPress={() => { Player._setSeek(this._stringToTime(item.id)) }}>
              {/* <Text style={(parseInt(this.getProgress*Player._getDuration())-this._stringToTime(item.id))==0? styles.con1:styles.con2}>    [{item.id}]   {item.value}</Text>    */}
               {/* <Text style={item.id == this.state.curentTime ? styles.con1 : styles.con2}>{item.value}</Text> */}
              <Text style={i== this.curentLineIndex ? styles.con1 : styles.con2}>{item.value}</Text>

            </TouchableOpacity>);
          }
        }
        >
        </FlatList>
           
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerProc: {
    flex: .6,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0abde320',
    
    flexDirection: 'row',
    width: screenWidth,
  },
  con1:{
    width:"100%",
    height:30,
    fontSize:17, 
    color: "#00fdff",
    textShadowColor: '#48dbfb99',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 39,
    textAlign: 'center',
    marginTop:0,
  },
  con2:{
    width:"100%",
    height: 30,
    fontSize:17, 
    color:"#341f97",
    textShadowColor: '#48dbfb88',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 39,
    textAlign:'center',
    marginTop: 0,
  }
});

