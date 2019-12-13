export function setSongPlay(id,title,artists_names,lyric,duration) {
    return { type: 'SET_CURRENT_SONG',id,title,artists_names,lyric,duration};
}


export function setPlayListOnline(id,dataSong)
{
    return {type:'SET_CURRENT_PLAYLIST_ONL',id,dataSong}
}