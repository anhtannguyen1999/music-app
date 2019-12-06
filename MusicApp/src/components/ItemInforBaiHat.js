import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity,Animated } from "react-native";
import { Dimensions } from "react-native";
import PropTypes from 'prop-types';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class ItemInforBaiHat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isError: false,
            fadeAni: new Animated.Value(0)
        }
    };

    componentDidMount()
    {
        Animated.timing(
            this.state.fadeAni,
            {
                toValue:100,
                duration:5000

            }
        ).start();
    }

    render() {
        const valueOpa=this.state.fadeAni;
        return (
            <Animated.View  style={ this.props.colorItem == 0 ? styles.container : styles.container1 } >
                <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',marginTop:20,marginLeft:10}}>
                <Text fontSize={20} fontWeight={15} >
                <Text>{this.props.stt}</Text>
                </Text>
                </View>

                <Animated.View  onPress={() => { }}>
                    <Animated.Image  loadingIndicatorSource={require('../../res/m_musicicon.png')}
                        style={styles.imageStyle} source={this.props.image === 'url' || this.state.isError ? require('../../res/m_musicicon.png') : { uri: this.props.image }}
                        onError={(e) => this.setState({ isError: true })}></Animated.Image>
                    {/* <Image style={styles.imageStyle} source={{ uri: 'http://avatar.nct.nixcdn.com/song/2019/10/02/3/1/4/d/1570008789331.jpg' }}></Image> */}
                </Animated.View>
                <View style={styles.inforStyle}>
                    <Animated.Text style={{ opacity:valueOpa, fontStyle: 'normal', fontWeight: 'bold', fontSize: 15 }}>{this.props.ten + ''}</Animated.Text>
                    <Text style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: 13 }}>{this.props.casi + ''}</Text>
                    <Text style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: 10 }}>{this.props.time + ''}</Text>

                </View>
                
                    <Animated.Image style={{width: 30, height: 60, marginRight: 10, resizeMode: 'center' }} source={require('../../res/threeDot.png')}></Animated.Image>
                
                

            </Animated.View>
        );
    };
    // https://facebook.github.io/react-native/docs/flatlist

}
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
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 5,
    },
    imageStyle: {
        width: 60,
        height: 60,
        margin: 3,
        resizeMode: 'center',
        borderRadius: 3,
    }
});
