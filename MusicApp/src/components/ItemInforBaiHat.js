import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import PropTypes from 'prop-types';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class ItemInforBaiHat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isError: false,
        }
    };
    
    render() {
        return (
            <View style={this.props.colorItem == 0 ? styles.container : styles.container1}>
                <Text>
                    
                </Text>
                <TouchableOpacity onPress={() => { }}>
                    <Image loadingIndicatorSource={require('../../res/m_musicicon.png')}
                        style={styles.imageStyle} source={this.props.image === 'url' || this.state.isError ? require('../../res/m_musicicon.png') : { uri: this.props.image }}
                        onError={(e) => this.setState({ isError: true })}></Image>
                    {/* <Image style={styles.imageStyle} source={{ uri: 'http://avatar.nct.nixcdn.com/song/2019/10/02/3/1/4/d/1570008789331.jpg' }}></Image> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.inforStyle}>
                    <Text style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: 15 }}>{this.props.ten + ''}</Text>
                    <Text style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: 15 }}>{this.props.casi + ''}</Text>
                    <Text style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: 10 }}>{this.props.nentang + ''}</Text>
                </TouchableOpacity>
               
                    <Image style={{ width: 30, height: 60, marginRight: 10, resizeMode: 'center' }} source={require('../../res/threeDot.png')}></Image>
                
            </View>
        );
    };
    // https://facebook.github.io/react-native/docs/flatlist

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F0FDFF',
        flexDirection: 'row',
        width: screenWidth*0.94,
        borderRadius:3,
    },
    container1: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#D9EDF0',
        flexDirection: 'row',
        borderRadius:3,
        width:screenWidth*0.94

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
        borderRadius:3,
    }
});
