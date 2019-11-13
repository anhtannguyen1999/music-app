import React, { Component } from 'react'
import {
    StyleSheet,
    Button,
    View,
    ScrollView, Text,
    FlatList,
    TouchableOpacity, Image
} from 'react-native'
import { Dimensions } from "react-native";
import { SearchBar } from 'react-native-elements';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
const screenWidth = Math.round(Dimensions.get('window').width);
export default class HomeScreen extends Component{
    static navigationOptions={
        header:null,
    }

    state = {
        searchValue: '',
    };

    UNSAFE_componentWillMount(){

    }

    render(){
        
        var DSBaiHatVuaNghe = [
            {
                ten: 'Co tham khong ve',
                casi: 'First Item',
                image:'url',
                colorItem:0,
            },
            {
                ten: 'Em gi oi',
                casi: 'Jack & KICM',
                image: 'url',
                colorItem:1,
            },
        ];

        var DSBaiHatTopGoiY = [
            {
                ten: 'Hết thương cạn nhớ',
                casi: 'Đức Phúc',
                image: 'http://avatar.nct.nixcdn.com/song/2019/10/02/3/1/4/d/1570008789331.jpg',
                colorItem: 0,
            },
            {
                ten: 'Em gi oi',
                casi: 'Jack & KICM',
                image: 'url',
                colorItem: 1,
            },
            {
                ten: 'Loi nho',
                casi: 'Jack & KICM',
                image: 'url',
                colorItem: 0,
            },
            {
                ten: 'Anh nha o dau the',
                casi: 'Jack & KICM',
                image: 'url',
                colorItem: 1,
            },
            {
                ten: 'Simple Love',
                casi: 'Jack & KICM',
                image: 'url',
                colorItem: 0,
            },
            {
                ten: 'Co tham khong ve remix',
                casi: 'Jack & KICM',
                image: 'http://avatar.nct.nixcdn.com/singer/avatar/2019/06/28/2/2/1/d/1561697475916.jpg',
                colorItem: 1,
            },
        ];

        return(
            <View style={styles.container}>
                {/* search bar */}
                <View style={{ paddingTop: 0, marginBottom: 1, width: screenWidth, }}>
                    <SearchBar
                        round
                        lightTheme={true}
                        searchIcon={{ size: 24 }}
                        placeholder="Type Here..."
                        // onFocus={() => this.props.navigation.navigate('Search')}
                        onSubmitEditing={text => this.searchFor(this.state.searchValue)}
                        onChangeText={text => this.setState({ searchValue:text})}
                        onClear={text => this.setState({ searchValue: '' })}
                        value={this.state.searchValue}
                    />

                </View>

                {/* Hien thi cac scroll view chua cac danh sach cac bai hat...*/}
                <ScrollView horizontal={false} pagingEnabled={false}>
                    {/* Anh bia */}
                    <TouchableOpacity > 
                        <Image style={{ width: screenWidth, height: 60, marginTop: 1, marginBottom: 2}}
                                source={require('../../res/cover.jpg')}/>
                    </TouchableOpacity>
                    
                    {/* 2 Bai hat da nghe gan day */}
                    <View style={styles.container}>
                        <Text style={styles.tieuDe}>Bài hát gần đây</Text>
                        <FlatList
                            data={DSBaiHatVuaNghe}
                            renderItem={({ item }) => <ItemInforBaiHat ten={item.ten} casi={item.casi} image={item.image} colorItem={item.colorItem} />}
                            keyExtractor={item => item.ten}
                            
                        />
                    </View>

                    {/* Top song */}
                    <View style={styles.container}>
                        <Text style={styles.tieuDe}>Bài hát gợi ý</Text>
                        <FlatList
                            data={DSBaiHatTopGoiY}
                            renderItem={({ item }) => <ItemInforBaiHat ten={item.ten} casi={item.casi} image={item.image} colorItem={item.colorItem}/>}
                            keyExtractor={item => item.ten}

                        /> 
                    </View>

                    {/* Play list goi y */}
                    <View style={styles.container}>
                        <Text>feg</Text>
                    </View>

                    {/* Local music */}
                    <View style={styles.container}>
                        <Text>def</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    gotoSongScreen() {
        this.props.navigation.navigate('Song');
    }

    searchFor(value){
        this.props.navigation.navigate('Search',{textForSearch:value,isRequireForSearch:true});
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        width:screenWidth,
        justifyContent:'center',
        alignItems:'flex-start',
        backgroundColor:'#F5FCFF',
    },
    tieuDe:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize:20,
        fontWeight:'bold',
        marginTop:5,
        marginLeft:3,
    }
});




