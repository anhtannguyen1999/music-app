import React,{Component} from 'react'
import {
    StyleSheet, View, Button,FlatList,Text, TouchableOpacity
} from 'react-native'
import { SearchBar } from 'react-native-elements';
import { Dimensions } from "react-native";
import ItemInforBaiHat from '../components/ItemInforBaiHat';
const screenWidth = Math.round(Dimensions.get('window').width);
import Player, { MyPlayerBar } from '../player/Player'
var DomParser = require('react-native-html-parser').DOMParser
export default class SearchScreen extends Component{
    constructor(props) {
        super(props);
        console.log("Constructor");
        this.state = {
            loading: false,
            data:[],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            dataGoiY:[],
            searchValue: '',
          };
        

        // if (valueForSearch.textForSearch !== '') {
        //     this.setState({ searchValue: valueForSearch });
        // }

        // if (isRequireForSearch)
        //     this.SearchFor(this.state.searchValue);

    }
    static navigationOptions = {
        header: null,
    }

    
    UNSAFE_componentWillReceiveProps(nextProps){
        console.log("mount");



    }

    _loadImageFromURL(URL)
    {
        //console.log(valueSearch);

        get(URL)
        .then(response=>{
            console.log("reponse html:   "+URL+response);
   

            //let doc = new DomParser().parseFromString(response,'text/html')
            //console.log(doc);
            
            //this.setState({dataGoiY : response.data.song,})
        });

    }

     _loadGoiYsearch(){
        //value='hong nhan'
        var inPut= this.state.searchValue;
        let valueSearch=inPut.replace(" ","%20");
        console.log(valueSearch);

        fetch("https://zingmp3.vn/api/search/multi?q="+valueSearch+"&ctime=1571563884&sig=b4d8d117b0c44bb6327e8c641a2b863c843ab05be5953764695a13e787abbd969e6c0c180a5c2bd42d33cf6351c848bdcc8b8ea0789be7d2ea29fbada7544c65&api_key=38e8643fb0dc04e8d65b99994d3dafff")
        .then(response=>response.json())
        .then(response=>{
            console.log(response.data.song);
            
            this.setState({dataGoiY : response.data.song.items,})
        });
        
    }


    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        // const newData = this.arrayholder.filter(function (item) {
        //     //applying filter for the inserted text in search bar
        //     const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        //     const textData = text.toUpperCase();
        //     return itemData.indexOf(textData) > -1;
        // });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            //dataSource: newData,
            searchValue: text,
        });
    }

    SearchFor(text){
        console.log("I'm searching for: "+text);
        this._loadGoiYsearch();
    }


    render(){
        console.log("Render");
        
        const { navigation } = this.props;
        const valueForSearch = this.props.navigation.getParam('searchValue', '');
        const isRequireForSearch = navigation.getParam('isRequireForSearch', false);
        console.log(valueForSearch);

        const screenWidth = Math.round(Dimensions.get('window').width);  
        return(
            <View style={styles.container}>
                <View   
                    style={{
                        paddingTop: 0, marginBottom: 1, width: screenWidth, backgroundColor:"#F02"}}
                    >
                    <SearchBar
                        round
                        lightTheme={true}             
                        searchIcon={{ size: 24 }}
                        onChangeText={text =>{ 
                            //this._loadGoiYsearch();
                            this.setState({ searchValue: text })}}
                        onClear={text => this.setState({ searchValue: '' })}
                        placeholder="Type Here..."
                        value={this.state.searchValue}
                        onSubmitEditing={text => this.SearchFor(this.state.searchValue)}
                    />

                </View>
                <Button
                    title='Search Screen'
                    onPress={()=>this.props.navigation.navigate('Profile')}
                />
                    <View style={styles.container1}>
                        <Text style={styles.tieuDe}> Kết quả tìm kiếm:</Text> 
                    
                        <View style={styles.danhsach}>
                            <FlatList
                                data={this.state.dataGoiY}
                                extraData={this.state}
                                renderItem={({ item }) =>
                                // _url= 'http://api.mp3.zing.vn/api/streaming/audio/'+item.id+'/128';
                                <TouchableOpacity flex={1} width={screenWidth} onPress={()=> {Player.PlayMusic(item.title,'http://api.mp3.zing.vn/api/streaming/audio/'+item.id+'/128',item.title,item.artists_names,item.thumbnail,item.duration), console.log("play___http://api.mp3.zing.vn/api/streaming/audio/"+item.id+'/128'),this.props.navigation.navigate('Stream')}}>
                                    
                                    <ItemInforBaiHat
                                        
                                        ten={item.title} 
                                        casi={item.artists_names} 
                                        image={item.thumbnail}                             
                                        time={  (parseInt(item.duration%60))<10?  parseInt(item.duration/60) +":"+  "0"+parseInt(item.duration%60,10):parseInt(item.duration/60) +":"+parseInt(item.duration%60,10) }
                                        colorItem={1} 
                            
                                    />
                                </TouchableOpacity>
                                }
                                keyExtractor={item => item.title}  
                                />
                        </View>

                    </View>
                            
                

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffb8b8',
        flexDirection: 'column'
    },
    container1: {
        flex: 1,
        width:screenWidth*0.95,
        justifyContent:'center',
        alignItems:'flex-start',
        backgroundColor: '#32ff7e',
        flexDirection: 'column',
        margin:10,
        borderRadius:10,

    },
    tieuDe:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize:20,
        fontFamily:'vincHand',
        fontWeight:'bold',
        marginTop:25,
        marginLeft:3,
        marginBottom:3,
        color:"#f00"
    },
    danhsach:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize:20,
        fontFamily:'vincHand',
        fontWeight:'bold',
        marginTop:0,
        marginLeft:3,
        marginBottom:3,
        color:"#f00"
    },
})
