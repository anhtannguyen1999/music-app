import {combineReducers} from 'redux'
import currentSong from './currentSong'
import currentPlayListOnline from './currentPlayListOnlineReducer'
const reducer =combineReducers({
    currentSong:currentSong,
    currentPlayListOnline:currentPlayListOnline,
});
export default reducer;