const defaultPlayList=[]

const dataAllPlaylist = (state = defaultPlayList, action) => {
    if (action.type === 'SET_DATA_ALL_PLAYLIST') {
          //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
        return action.dataAllPlaylist;    
    }
    return state;

};
export default dataAllPlaylist;