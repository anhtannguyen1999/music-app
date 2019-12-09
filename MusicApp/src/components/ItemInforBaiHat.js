import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSongPlay  } from '../redux/action';

const screenWidth = Math.round(Dimensions.get('window').width);

class ItemInforBaiHat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      fadeAni: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAni, {
      toValue: 100,
      duration: 5000,
    }).start();
  }

  render() {
    const valueOpa = this.state.fadeAni;
    return (
      <View
        style={{
          width:screenWidth,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 5,
          marginLeft: 5,
          backgroundColor:"#999"
        }}>
        <Text fontSize={20} fontWeight={15}>
          <Text>    {this.props.stt}</Text>
        </Text>

        <View onPress={() => {}}>
          <Image
            loadingIndicatorSource={require('../../res/m_musicicon.png')}
            style={styles.imageStyle}
            source={
              this.props.image === 'url' || this.state.isError
                ? require('../../res/m_musicicon.png')
                : {uri: this.props.image}
            }
            onError={e => this.setState({isError: true})}></Image>
          {/* <Image style={styles.imageStyle} source={{ uri: 'http://avatar.nct.nixcdn.com/song/2019/10/02/3/1/4/d/1570008789331.jpg' }}></Image> */}
        </View>
        
                <View style={styles.inforStyle}>
                <TouchableOpacity onPress={()=>{this.props.setSongPlay(this.props.id,this.props.title,this.props.artists_names,this.props.lyric,this.props.duration)}} >
                    <Animated.Text
                    style={{
                        //opacity: valueOpa,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: 15,
                    }}>
                    {this.props.title + ''}
                    </Animated.Text>
                    <Text
                    style={{fontStyle: 'italic', fontWeight: 'normal', fontSize: 13}}>
                    {this.props.artists_names + ''}
                    </Text>
                    <Text
                    style={{fontStyle: 'italic', fontWeight: 'normal', fontSize: 10}}>
                        {   parseInt(this.props.duration % 60) < 10
                            ? parseInt(this.props.duration / 60) +
                              ':' +
                              '0' +
                              parseInt(this.props.duration % 60, 10)
                            : parseInt(this.props.duration / 60) +
                              ':' +
                              parseInt(this.props.duration % 60, 10)}
                    </Text>
                    </TouchableOpacity>
                </View>
 
        <Image
          style={{width: 30, height: 60, marginRight: 10, resizeMode: 'center'}}
          source={require('../../res/threeDot.png')}></Image>
      </View>
    );
  }
  // https://facebook.github.io/react-native/docs/flatlist
}

function mapStateToProps(state) {
    return { myCurrentSong: state.currentSong };
  }
  
  export default connect(null, {setSongPlay})(ItemInforBaiHat);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#6c5ce7',
    flexDirection: 'row',
    width: screenWidth * 0.94,
    borderRadius: 3,
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#74b9ff',
    flexDirection: 'row',
    borderRadius: 3,
    width: screenWidth * 0.94,
  },
  inforStyle: {
    
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  imageStyle: {
    width: 60,
    height: 60,
    margin: 3,
    resizeMode: 'center',
    borderRadius: 3,
  },
});
