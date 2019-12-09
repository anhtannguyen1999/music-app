import React, {Component, cloneElement} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity,SafeAreaView} from 'react-native';

import TrackPlayer from 'react-native-track-player';
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { setSongPlay  } from '../redux/action';
 class ProfileScreen extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
    };

  }
  static navigationOptions = {
    header: null,
  };

  _loadGoiYSearch2() {

      fetch(
        'https://ac.zingmp3.vn/suggestKeyword?num=5&query=Hong'
      )
        .then(response => {
          return response.json();
        })
        .then(res => {
          this.setState({data: res.data});
        });
    
  }


  
  componentDidMount() {
    fetch(
      'https://ac.zingmp3.vn/suggestKeyword?num=5&query=Hong'
    )
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({data: res.data});
      });
  }
 
  handleSelectItem(item, index) {
    //const {onDropdownClose} = this.props;
    //this.props.onDropdownClose();
    console.log(item);
  }


  render() {
    var tt=[
      {
        id:1,
        value:"111"
      },
      {
        id:2,
        value:"222"
      },
      {
        id:3,
        value:"333"
      }
    ]
    const data = [
      "Apples",
      "Broccoli",
      "Chicken",
      "Duck",
      "Eggs",
      "Fish",
      "Granola",
      "Hash Browns",
    ];
    var data2=["Hong Nhan", "Hong Nhan Jack", "Hong Nhan Bac Phan Single", "Hong Nhan K-ICM Mix", "Hong Nhan K-ICM Mix Jack  K-ICM"]
    //console.log(data)
    //this._loadGoiYSearch2();
    //console.log(this.state.dataGoiY);
    var datagoiy2=this.state.data.slice();
    console.log(this.state.data);
    const apiUrl = "https://ac.zingmp3.vn/suggestKeyword?num=5&query=Hong";

    const {scrollToInput, onDropdownClose, onDropdownShow} = this.props;

    return (
      <View style={styles.autocompletesContainer}>
        <Icon name='flash' size ={30}></Icon>
        <SafeAreaView>
          
            <Autocomplete
            width={1000}
              //onChangeText={()=>this._loadGoiYSearch2()}
              //console.log(this.state.dataGoiY)
              data={this.state.data}
             // waitInterval={400}
              //key={shortid.generate()}
              style={styles.input}
              //scrollToInput={e => scrollToInput(e)}
              handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
              //onDropdownClose={() => onDropdownClose()}
              //onDropdownShow={() => onDropdownShow()}
             // renderIcon={() => (
               // <Ionicons name="ios-add-circle-outline" size={20} color="#c7c6c1" style={styles.plus} />
             // )}
              //fetchDataUrl={apiUrl}
              //fetchData={(search)=> this._loadGoiYSearch2()}
              minimumCharactersCount={0}
              highlightText
              valueExtractor={item => item}
              rightContent
              rightTextExtractor={item => item}
            />
          
        </SafeAreaView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { myCurrentSong: state.currentSong };
}

export default connect(mapStateToProps, {setSongPlay})(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 1000,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 8,
    alignSelf:'stretch'
  },
  input: {maxHeight: 40},
  con1:{
    width:"100%",
    fontSize:20, 
    color:"#000",
  },
  con2:{
    width:"100%",
     fontSize:20, 
     color:"#f0f",
    color:"#F45"
  },

  input: {maxHeight: 40},
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },

});
