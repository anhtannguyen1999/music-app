import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
  Animated,
  TouchableHighlight,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

export default class ItemComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      fadeAni: new Animated.Value(0),
      upPopup: false,
      upPopupAdd: false,
      reaload: 0,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAni, {
      toValue: 100,
      duration: 5000,
    }).start();
  }

  render() {
    return (
      <TouchableOpacity style={{flex: 1, width: '100%'}}>
        <View
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: 0,
            backgroundColor: '#fff',
            marginBottom: 2,
            borderWidth: 2,
            borderColor: '#000',

            borderRadius: 5,
          }}>
          <View
            style={
              (styles.inforStyle,
              {flexDirection: 'row', padding: 2, alignItems: 'center'})
            }>
            <Image
              style={{
                borderRadius: 10,
                width: 20,
                height: 20,
                backgroundColor: '#000',
              }}
              source={
                this.props.urlImage == null
                  ? {
                      uri:
                        'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.macrumors.com%2Farticle-new%2F2018%2F05%2Fapple-music-note-800x420.jpg&imgrefurl=https%3A%2F%2Fwww.macrumors.com%2Fguide%2Fapple-music%2F&docid=GhBKqUc-8Hrm_M&tbnid=i4ZMj59EAkdbCM%3A&vet=10ahUKEwjyt-zMi8jmAhXLyIsBHXQoCP4QMwhMKAAwAA..i&w=800&h=420&bih=680&biw=1353&q=music&ved=0ahUKEwjyt-zMi8jmAhXLyIsBHXQoCP4QMwhMKAAwAA&iact=mrc&uact=8',
                    }
                  : {uri: this.props.urlImage}
              }></Image>
            <Text style={{fontSize: 15}}> {this.props.name} </Text>
            <View
              style={{
                backgroundColor: '#b8e994',
                borderRadius: 10,
                marginBottom: 0,
                marginLeft: 0,
                padding:2,
                flex: 1,
              }}>
              <Text style={{fontSize: 15}}> {this.props.cmt}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#ccc',
              borderRadius: 3,
              marginBottom: 0,
              marginLeft: 25,
              justifyContent: 'flex-end',
            }}>
            <Text style={{fontSize: 10}}> {this.props.time} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  // https://facebook.github.io/react-native/docs/flatlist
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#6c5ce7',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 3,
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#74b9ff',
    flexDirection: 'row',
    borderRadius: 3,
    width: '100%',
  },
  inforStyle: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 5,
    marginLeft: 10,
  },
  imageStyle: {
    flex: 2,
    width: 45,
    height: 60,
    margin: 3,
    resizeMode: 'center',
    borderRadius: 3,
  },
});
