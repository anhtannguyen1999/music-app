const defaultPlayList=[]

const dataBHVuaNghe = (state = defaultPlayList, action) => {
    if (action.type === 'SET_DATA_BH_VUA_NGHE') {
          //var obj = {id:action.id,title:action.title,artists_names:action.artists_names,lyric:action.lyric,duration:action.duration}
        return action.dataBHVuaNghe;    
    }
    return state;

};
export default dataBHVuaNghe;