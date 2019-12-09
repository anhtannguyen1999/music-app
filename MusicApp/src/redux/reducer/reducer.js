import {combineReducers} from 'redux'
import currentSong from './currentSong'
const reducer =combineReducers({
    currentSong:currentSong,
});
export default reducer;