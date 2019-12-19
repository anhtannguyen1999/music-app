const defaultPlayList={"items":[]}

const dataMusicLocal = (state = defaultPlayList, action) => {
    if (action.type === 'SET_DATA_MUSIC_LOCAL') {
          //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
        return action.dataMusicLocal;    
    }
    return state;

};
export default dataMusicLocal;