import React, {Component} from 'react'
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView
}from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RNFetchBlob from 'rn-fetch-blob';
export default class LoginScreen extends Component{
    componentDidMount(){
        this._checkFileLocal()
    }
    _checkFileLocal()
    {
        var fs=RNFetchBlob.fs;
        var path = RNFetchBlob.fs.dirs.SDCardDir+"/DataLocal"
         RNFetchBlob.fs.exists(path).then((value)=>{
             if(!value)
             {
                 
            fs.mkdir(path).then(()=>
            {
                
                fs.mkdir(path+"/PlayList_Local")
                fs.mkdir(path+"/BaiHatVuaNghe")
                fs.mkdir(path+"/Music_Local").then(()=>{
                    fs.mkdir(path+"/Music_Local/DataMusicLocal")
                })
            }
            ).then(()=>{
                let objMusicLocalManager={"total_song":0,"items":[]}
                fs.createFile(path+"/Music_Local/MusicLocalManager.js",JSON.stringify(objMusicLocalManager),'utf8')

                let objPlayList_Local={"total_list":0,"list":[]}
                fs.createFile(path+"/PlayList_Local/PlayListManager.js",JSON.stringify(objPlayList_Local),'utf8')

                let objBHVuaNghe={"items":[]}
                fs.createFile(path+"/BaiHatVuaNghe/BaiHatVuaNghe.js",JSON.stringify(objBHVuaNghe),'utf8')
            
            })

        
             }

        })

        
    }
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

