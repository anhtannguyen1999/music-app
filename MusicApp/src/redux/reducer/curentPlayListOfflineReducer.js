
const defaultPlayList={id:'',dataSong:[]}

const currentPlayListOffline = (state = defaultPlayList, action) => {
    if (action.type === 'SET_CURRENT_PLAYLIST_OFFL') {
          //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
        return {id:action.id,dataSong:action.dataSong};    
    }
    if(action.type==="REMOVE_SONG")
    {
        for(let i=0;i<currentPlayListOffline.length;i++)
        {
            if(currentPlayListOffline.dataSong[i].id==action.id)
            {
                
                return state.dataSong.slice(i,1)
            }
                
        }
    }
    return state;

};
export default currentPlayListOffline;