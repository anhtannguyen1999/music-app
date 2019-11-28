import TrackPlayer, { } from 'react-native-track-player';
import { useTrackPlayerProgress  } from 'react-native-track-player';
import React, { Component } from 'react'
import {
    Text, View, ProgressBarAndroid,StyleSheet,Dimensions
} from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width);
export default class Player{
    static KhoiTaoPlayer(){
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
        TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious());
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
    static daKhoiTao=false;
    static duration=10;
    static _getDuration()
    {
        return this.duration;
    }

    static _setPause()
    {
        TrackPlayer.pause();
    }
    static _setPlay()
    {
        TrackPlayer.play();
    }
    static PlayMusic(id,url,title,artist,artwork,total_time) {
        if(this.daKhoiTao==false)
        {
        this.KhoiTaoPlayer();
        this.daKhoiTao=true;

        }
        
        this.duration=parseInt(total_time);
        TrackPlayer.setupPlayer().then(async () => {

            // Adds a track to the queue


            await TrackPlayer.add({
                id: id,
                url: url,
                title: title,
                artist: artist,
                artwork: artwork,
            });
            console.log("add "+title+"   TotalTime: "+this.duration+" OK! _dakhoitao"+this.daKhoiTao);
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
        this.onTrackChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {

            const track = await TrackPlayer.getTrack(data.nextTrack);
            this.setState({ trackTitle: track.title });

        });
    }

    componentWillUnmount() {
        // Removes the event handler
        this.onTrackChange.remove();
    }

    render() {
        return (
            <Text>{this.state.trackTitle}</Text>
        );
    }

}


export class MyPlayerBar extends TrackPlayer.ProgressComponent {

    render() {
        return (
            <View style={styles.containerProc}>
                <Text> </Text>
                  <ProgressBarAndroid
                    margin={2}
                    styleAttr="Horizontal"
                    color="#000"
                    progress={this.getProgress()}
                    indeterminate={false}
                    width={screenWidth-80}
                    
                  />
    <Text>  {(parseInt(this.getProgress()*Player._getDuration()%60))<10?  parseInt(this.getProgress()*Player._getDuration()/60) +":"+  "0"+parseInt(this.getProgress()*Player._getDuration()%60,10):parseInt(this.getProgress()*Player._getDuration()/60) +":"+parseInt(this.getProgress()*Player._getDuration()%60,10)}/ 
        {(parseInt(Player._getDuration()%60))<10?  parseInt(Player._getDuration()/60) +":"+  "0"+parseInt(Player._getDuration()%60,10):parseInt(Player._getDuration()/60) +":"+parseInt(Player._getDuration()%60,10)}</Text>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerProc: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#f55",
        flexDirection: "row",
        width: screenWidth
      }
    });