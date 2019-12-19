import RNFetchBlob from 'rn-fetch-blob'
const defaultPlayList={}
const dataAllPlaylist = (state = defaultPlayList, action) => {
    if (action.type === 'SET_DATA_ALL_PLAYLIST') {
          //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
        return action.dataAllPlaylist;    
    }

    if(action.type==="REMOVE_SONG_FROM_LOCAL")
    {

    }
    return state;

};
export default dataAllPlaylist;