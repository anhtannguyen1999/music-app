const defaultVal={val:0};

const indexPlayingInList = (state = defaultVal, action) => {
    if (action.type === 'SET_INDEX') {
          //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
        return {val:action.index};    
    }
    return state;

};
export default indexPlayingInList;