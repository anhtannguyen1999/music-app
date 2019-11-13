import React,{Component} from 'react'
import {
    StyleSheet, View, Button
} from 'react-native'
import { SearchBar } from 'react-native-elements';
import { Dimensions } from "react-native";

export default class SearchScreen extends Component{
    constructor(props) {
        super(props);
        console.log("Constructor");
        

        // if (valueForSearch.textForSearch !== '') {
        //     this.setState({ searchValue: valueForSearch });
        // }

        // if (isRequireForSearch)
        //     this.SearchFor(this.state.searchValue);

    }
    UNSAFE_componentWillReceiveProps(nextProps){
        console.log("mount");

    }
    static navigationOptions = {
        header: null,
    }
    state = {
        searchValue: '',
    };
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
                        onChangeText={text => this.setState({ searchValue: text })}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column'
    }
})
