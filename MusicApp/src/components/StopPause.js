import React, { Component } from 'react'
import {
    StyleSheet,
    Button,
    View,
    Image,
    ProgressBarAndroid
} from 'react-native'
export default class StopPause extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerProc}>
                    <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />

                    <Text> 0:00/5:00</Text>
                </View>

                <View style={styles.containerButton}>
                    <Image source={'../../res/shuffle.png'}> 
                    </Image>

                    <Image source={'../../res/prev.png'}> 
                    </Image>

                    <Image source={'../../res/play_white.png'}> 
                    </Image>

                    <Image source={'../../res/next.png'}> 
                    </Image>

                    <Image source={'../../res/repeat.png'}> 
                    </Image>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    containerButton:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F0FDFF',
        flexDirection: 'row',
        width: 500,
        borderRadius:3,
    },
    containerProc:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F0FDFF',
        flexDirection: 'row',
        width: 500,
        borderRadius:3,
    }
});