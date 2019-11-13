import React, { Component } from 'react'
import {
    StyleSheet, View, Button
} from 'react-native';

export default class ProfileScreen extends Component{
    componentWillMount() {
        
    }

    componentDidMount() {
        
    }
    render(){
        return(
            <View style={styles.container}>
                <Button
                    title='Profile Screen'
                    onPress={()=>this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})