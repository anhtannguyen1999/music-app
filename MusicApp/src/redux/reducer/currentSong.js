const defaultSong={id:'',title:'',artists_names:'',lyric:'',duration:0}

const currentSong = (state = defaultSong, action) => {
    if (action.type === 'SET_CURRENT_SONG') {
          //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
        return {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration};    
    }
    return state;

};
export default currentSong;
