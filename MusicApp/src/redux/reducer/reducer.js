import {combineReducers} from 'redux'
import currentSong from './currentSong'
import currentPlayListOnline from './currentPlayListOnlineReducer'
import currentPlayListOffline from './curentPlayListOfflineReducer'
import dataAllPlaylist from './dataAllPlaylistReducer'
import dataMusicLocal from './dataMusicLocalReducer'
import dataBHVuaNghe from './dataBHVuaNgheReducer'
import isPause from './pauseReducer'
import dataDanhSachDangNghe from './dataDanhSachDangNgheReducer'
const reducer =combineReducers({
    currentSong:currentSong,
    currentPlayListOnline:currentPlayListOnline,
    currentPlayListOffline:currentPlayListOffline,
    dataAllPlaylist:dataAllPlaylist,
    dataMusicLocal:dataMusicLocal,
    dataBHVuaNghe:dataBHVuaNghe,
    isPause:isPause,
    dataDanhSachDangNghe:dataDanhSachDangNghe
});
export default reducer;