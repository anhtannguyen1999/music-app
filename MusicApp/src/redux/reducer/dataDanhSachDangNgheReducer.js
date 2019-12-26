import Player from '../../player/Player';
const defaultPlayList={id:'',dataSong:[]}


const dataDanhSachDangNghe = (state = defaultPlayList, action) => {
    if (action.type === 'SET_CURRENT_PLAYLIST_PLAYING') {
          //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
        return {id:action.id,dataSong:action.dataSong};    
    }
    if(action.type==='PLAY_IN_INDEX')
    {
        var obj =action.dataSong[0];
        
        //Player.PlayMusic(obj.id, obj.url, obj.title, obj.artist, obj.artwork, obj.total_time)
        return {id:action.id,dataSong:action.dataSong};
    }
    return state;

};
export default dataDanhSachDangNghe;