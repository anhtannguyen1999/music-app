const defaultPlayList={id:'',dataSong:[]}

const currentPlayListOnline = (state = defaultPlayList, action) => {
    if (action.type === 'SET_CURRENT_PLAYLIST_ONL') {
          //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
        return {id:action.id,dataSong:action.dataSong};    
    }
    return state;

};
export default currentPlayListOnline;