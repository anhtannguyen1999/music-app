import {combineReducers} from 'redux'
import currentSong from './currentSong'
import currentPlayListOnline from './currentPlayListOnlineReducer'
import currentPlayListOffline from './curentPlayListOfflineReducer'
import dataAllPlaylist from './dataAllPlaylistReducer'
const reducer =combineReducers({
    currentSong:currentSong,
    currentPlayListOnline:currentPlayListOnline,
    currentPlayListOffline:currentPlayListOffline,
    dataAllPlaylist:dataAllPlaylist,
});
export default reducer;