import React, {Component} from 'react'
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView
}from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class LoginScreen extends Component{
    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Icon name='soundcloud' size={50} color={'#FFF'}
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button title='Login to soundcloud'
                    color='fff'
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </SafeAreaView>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FF8C00',
    },

});

