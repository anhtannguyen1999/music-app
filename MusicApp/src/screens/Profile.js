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
componentDidMount()
{
    fetch("https://static-zmp3.zadn.vn/lyrics/3/1/f/c/31fc794ed9cf0914cd3babaa0dcf4c97.lrc")
    .then(reponse=>{
        console.log("loi bat hat: "+reponse.arrayBuffer());
    }

    )
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
        width: 500,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#ffb8b8',
        
    }
})