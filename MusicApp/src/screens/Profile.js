import React, {Component, cloneElement} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import Player, {MyPlayerBar} from '../player/Player';
import TrackPlayer from 'react-native-track-player';
export default class ProfileScreen extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
    this.state = {
      data_temp: [],
      tempString: '',
      stringLyric: '',
      index:'',
      curentTime:0,
      up:false
    };
   
  }
  static navigationOptions = {
    header: null,
  };

  
  componentDidMount() {
   // this._loadGoiYSearch2();

   fetch(
    'https://static-zmp3.zadn.vn/lyrics/e/4/5/9/e4592d70b838fd8c5b06f7968b7b3088.lrc'
  )
    .then(response => {
      return response.text();
    })
    .then(res => {
      //console.log(res);
     this.setState({stringLyric: res});
     this.xuLiLyric(this.state.stringLyric)
     //console.log(this.state.stringLyric+"hh");
      //if (value == '') this.setState({dataGoiY: []});
    });


    
  }

  xuLiLyric(input)
  {
    //console.log(this.state.stringLyric+"uuu")
    var value=new String();
    value=input+"[";
    var start=0;
    var end=0;
    var data = [];
    //data['00:00']='haha'
      for(let i=0;i<input.length;i++)
      {

        if(value[i]=="[")
        {
          end=i;
          var line =value.substring(start,end);
          var time =line.substring(1,6);
          var obj={id: time,value:line.substring(10,line.length-2)}
          //data[time]= line.substring(10,line.length-2);
          data.push(obj);
          start=end;
        }
      }
      //console.log(data);
      this.setState({data_temp:data})
      console.log("LOAD OK!")
  }

  _stringToTime(input)
  {
    var value = new String();
    value =input;
    return (parseInt(value.substring(0,2))*60+parseInt(value.substring(3,6)));
  }


  render() {
    var tt=[
      {
        id:1,
        value:"1"
      },
      {
        id:2,
        value:"2"
      },
      {
        id:3,
        value:"3"
      }
    ]

    //this.xuLiLyric(this.state.stringLyric)
    //console.log(this.state.data_temp)
    return (
      <View style={styles.container}>
        {/*<TouchableOpacity  onPress={()=>{this._showLyric(),this._renderText('hahaah')}}> 
        <Text style={{fontSize:20}}> Render </Text>       
        </TouchableOpacity>*/}
        <FlatList
        data={this.state.data_temp}
        extraData={this.state.up}
      renderItem={({item,index})=>(


      <TouchableOpacity onPress={()=>{Player._setSeek(this._stringToTime(item.id)),this.setState({up:++index})}}>
        <Text style={(parseInt(this.getProgress*Player._getDuration())-this._stringToTime(item.id))<=3? styles.con1:styles.con2 }> 
        {item.value} 
        </Text> 

      </TouchableOpacity>) }
        
        >

        
        </FlatList>
           
      </View>
    );
  }
}

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
  }

});
