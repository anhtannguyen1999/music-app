import React , {Component} from 'react'
import {
    StyleSheet,View, Button
}from 'react-native'

export default class StreamScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Button title='Stream Screen!'
                    onPress={()=>this.props.navigation.navigate('Song')}
                />
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    }
})

