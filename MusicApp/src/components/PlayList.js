import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
export default class PlayList extends Component {
  render() {
    return (
      <View style={styles.container}>
       
          <Image
            loadingIndicatorSource={require('../../res/m_musicicon.png')}
            style={styles.imageStyle}
            source={{uri: this.props.linkImagePlayList}}
            onError={e => {}}></Image>
        
    <Text style={{fontSize:8}}> {this.props.title}</Text>
    <Text style={{fontSize:8}}> {this.props.numberSong} bài</Text>
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
    padding:5,
    borderColor:"#000",
    borderWidth:2,
    borderRadius:5,
    width:186,
    
  },
  containerButton: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDFF',
    flexDirection: 'row',
    width: 500,
    borderRadius: 3,
  },
  containerProc: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDFF',
    flexDirection: 'row',
    width: 500,
    borderRadius: 3,
  },
  imageStyle: {
    width: 135,
    height: 135,
    margin: 3,
    resizeMode: 'center',
    borderRadius: 3,
  },
});
