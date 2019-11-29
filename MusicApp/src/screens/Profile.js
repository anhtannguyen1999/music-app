import React, { Component } from 'react'
import {
    StyleSheet, View, Button
} from 'react-native';

export default class ProfileScreen extends Component{


    constructor(props) {
        super(props);
        this.state = {
        
        };
    
      }
      static navigationOptions = {
        header: null,
    };


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
        width: 500,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#ffb8b8',
        
    }
})