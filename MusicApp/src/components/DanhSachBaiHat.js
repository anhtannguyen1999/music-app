import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Dimensions} from 'react-native';
import ItemInforBaiHat from '../components/ItemInforBaiHat';
const screenWidth = Math.round(Dimensions.get('window').width);
import Icon from 'react-native-vector-icons/Entypo'
import Player from '../player/Player';

import {connect} from 'react-redux';
import {setSongPlay,setDataDanhSachDangNghe,setPlay,setDataBHVuaNghe,setIndexPlayingInList} from '../redux/action';
import RNFetchBlob from 'rn-fetch-blob';

class DanhSachBaiHat extends Component {
  constructor(props) {
    super(props);
    console.log('Constructor');
    this.state = {};
  }
  _renderRemove()
  {
    return(
      <TouchableOpacity>
      <Icon name="trash" size ={20} style={{marginTop:28}}></Icon>
      </TouchableOpacity>
    )
  }

  static setMusicPlaying()
  {
    
   // this.props.setDataDanhSachDangNghe('',this.props.dataDanhSachBaiHat)
   // console.log(this.props.dataDanhSachDangNghe.dataSong)
    
  }
  play(id,title,artists_names,lyric,duration,image,linkMp3)
  {
    
    // if (this.props.kind !='PlayingList'){
    //   Player.ClearPlayingList();
    //   Player.AddASongToPlayingList(this.props.id, this.props.linkMp3, this.props.title, this.props.artists_names, this.props.image, this.props.duration, this.props.lyric);
    // }
    this.props.setPlay();
    this.props.setSongPlay(
      id,
      title,
      artists_names,
      lyric,
      duration,
    );

    if (linkMp3 != null) {
      Player.PlayMusic(
        title,
        linkMp3,
        title,
        artists_names,
        image,
        duration,
      )
    }
    else {
      Player.PlayMusic(
        title,
        'http://api.mp3.zing.vn/api/streaming/audio/' +
        id +
        '/128',
        title,
        artists_names,
        image,
        duration,
      )
    };
    this._addSongtoBHVuaNghe(id,title,artists_names,lyric,duration,image,linkMp3);
   // DanhSachBaiHat.setMusicPlaying();

  }

  _addSongtoBHVuaNghe(id,title,artists_names,lyric,duration,image,linkMp3) {
    var RemoveId = false;
    var temp = [];
    var path = RNFetchBlob.fs.dirs.SDCardDir + "/DataLocal/BaiHatVuaNghe/BaiHatVuaNghe.js";
    
    RNFetchBlob.fs.readFile(path).then((data)=>{
      temp=JSON.parse(data)
      let obj = { "id": id, "title": title, "artists_names": artists_names, "thumbnail_medium": image, "lyric": lyric, "duration": duration, "linkMp3": linkMp3 }
      for (let i = 0; i < temp.items.length; i++) {
        if (temp.items[i].id == id) {
          temp.items.splice(i, 1);
          RemoveId = true;
          break;
        }
      }
      if (RemoveId) {
        temp.items.unshift(obj)
      }
      else {
        if (temp.items.length == 5) { temp.items.pop(); }
        temp.items.unshift(obj)
      }
  
      RNFetchBlob.fs.writeFile(path, JSON.stringify(temp), 'utf8').then(() => { }
      )
      this.props.setDataBHVuaNghe(temp)


    })
    //temp = this.props.dataBHVuaNghe;
    
   

  }
 
_addDataBHDN()
{
  if(this.props.dataDanhSachDangNghe.id!=this.props.kind)
  {
    this.props.setDataDanhSachDangNghe(this.props.kind,this.props.dataDanhSachBaiHat)
    Player.playingList=this.props.dataDanhSachBaiHat;
  }

  
}


  render() {
    
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <View style={styles.container}>
     
    
          {/*<Text style={styles.tieuDe}> Danh sach bai hat:</Text>*/}

          <View style={styles.danhsach}>
            <FlatList
              data={this.props.dataDanhSachBaiHat}
              extraData={this.props.dataDanhSachBaiHat}
              initialNumToRender={5}
              maxToRenderPerBatch={6}
              windowSize={6}
              
              renderItem={({item, index}) => (
                <TouchableOpacity style={{width:'100%',flex:1}} onPress={()=>{
                  this.play(item.id,item.title,item.artists_names,item.lyric,item.duration,item.thumbnail_medium,item.linkMp3),
                  this._addDataBHDN()
                  this.props.setIndexPlayingInList(index)
                  Player.playingIndexList=index
                  
                  

                }}>
                             
                <ItemInforBaiHat
                kind={this.props.kind}
                canRemove={this.props.canRemove}
                stt={index+1}
                id={item.id}
                title={item.title}
                artists_names={this.props.kind == 'PlayingList' ? item.artist:item.artists_names}
                image={this.props.kind == 'PlayingList' ? item.artwork :item.thumbnail_medium}
                lyric={item.lyric}
                duration={this.props.kind == 'PlayingList' ? item.total_time :item.duration}
                colorItem={1}
                linkMp3={item.linkMp3}
                isTrongSuot={this.props.isTrongSuot}
              />
              </TouchableOpacity>
                  
                 
             
              )}
              keyExtractor={item => item.id}
            />
          </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    dataDanhSachDangNghe:state.dataDanhSachDangNghe,

  };
}

export default connect(mapStateToProps, {setSongPlay,setDataDanhSachDangNghe,setPlay,setDataBHVuaNghe,setIndexPlayingInList})(DanhSachBaiHat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
   // backgroundColor: '#fff',
    flexDirection: 'column',
  },
  container1: {
    flex: 2,
    width: screenWidth * 0.95,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'column',
    margin: 10,
    borderRadius: 10,
  },
  tieuDe: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
    fontFamily: 'vincHand',
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 3,
    marginBottom: 3,
    color: '#000',
  },
  danhsach: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
    fontFamily: 'vincHand',
    fontWeight: 'bold',
    marginTop: 0,
    marginLeft: 3,
    marginBottom: 3,
    color: '#000',
  },
  imageStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 135,
    height: 135,
    margin: 3,
    padding:0,
    resizeMode: 'center',
    borderRadius: 3,
    borderColor:'#000',
    borderWidth:2
  },
});