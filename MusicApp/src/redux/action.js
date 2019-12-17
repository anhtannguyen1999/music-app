export function setSongPlay(id,title,artists_names,lyric,duration) {
    return { type: 'SET_CURRENT_SONG',id,title,artists_names,lyric,duration};
}
export function setPlayListOnline(id,dataSong)
{
    return {type:'SET_CURRENT_PLAYLIST_ONL',id,dataSong}
}

export function setPlayListOffline(id,dataSong)
{
    return {type:'SET_CURRENT_PLAYLIST_OFFL',id,dataSong}
}

export function setDataAllPlayList(dataAllPlaylist)
{
    return {type:'SET_DATA_ALL_PLAYLIST',dataAllPlaylist}
}

export function setDataMusicLocal(dataMusicLocal)
{
    return {type:'SET_DATA_MUSIC_LOCAL',dataMusicLocal}
}

export function setDataBHVuaNghe(dataBHVuaNghe)
{
    return {type:'SET_DATA_BH_VUA_NGHE',dataBHVuaNghe}
}

