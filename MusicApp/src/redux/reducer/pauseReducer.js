const defaultVal=false;

const isPause = (state = defaultVal, action) => {
    if (action.type === 'SET_PAUSE') {
          //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
        return false;    
    }

    if (action.type === 'SET_PLAY') {
        //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
      return true;    
  }

    return state;

};
export default isPause;