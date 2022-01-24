import { request } from './request'

// 获取歌词
export function getLyric (id) {
  return request({
    url: `/lyric?id=${id}`,
  })
}


// 歌曲评论 
export function getSongComment (params) {
  return request({
    url: "/comment/music",
    params
  })
}

// 发送 删除评论
export function sendComment (params) {
  return request({
    url: `/comment?timestamp=${new Date().valueOf()}`,
    params
  })
}

// 相似歌曲
export function simiSong (id) {
  return request({
    url: `/simi/song?id=${id}`,
  })
}
// 获取相似歌单
export function simiPlaylist (id) {
  return request({
    url: `/simi/playlist?id=${id}`,
  })
}