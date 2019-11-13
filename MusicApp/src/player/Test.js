import React from 'react';
import { Text, View } from 'react-native';
import { useTrackPlayerEvent, TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';

// Subscribing to the following events inside MyComponent
const events = [
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_ERROR
];

export const MyComponent = () => {
    const [playerState, setState] = useState(null)

    useTrackPlayerEvents(events, (event) => {
        if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
            console.warn('An error occured while playing the current track.');
        }
        if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
            setState(playbackState)
        }
    });

    const isPlaying = playerState === STATE_PLAYING;

    return (
        <View>
            <Text>The TrackPlayer is {isPlaying ? 'playing' : 'not playing'}</Text>
        </View>
    );
};