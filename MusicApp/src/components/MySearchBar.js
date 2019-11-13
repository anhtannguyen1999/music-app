import React, { Component } from 'react'
import {
    StyleSheet, View, Button
} from 'react-native'



export default class OtherScreenSearchBar extends Component {
    
    render() {
        
        return (
            <View style={styles.container}>
                <View style={{paddingTop: 0, marginBottom: 1, width: screenWidth,}}>
                    <SearchBar
                        round
                        lightTheme={true}
                        searchIcon={{ size: 24 }}
                        placeholder="Type Here..."
                        onFocus={() => this.props.navigation.navigate('Search')}
                        onSubmitEditing={text => console.log("OK tim kiem ne")}
                    />

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
        backgroundColor: '#fff',
        flexDirection: 'column'
    }
})
