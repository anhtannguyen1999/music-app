// This needs to go right after you register the main component of your app
//AppRegistry.registerComponent(...)
//TrackPlayer.registerPlaybackService(() => require('./service.js'));
// service.js
import TrackPlayer, { } from 'react-native-track-player';
module.exports = async function () {

    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

    // ...
    console.log("Vao service.js");

};


