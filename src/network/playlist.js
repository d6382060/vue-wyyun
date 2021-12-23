import { request } from './request'

// 歌单详情
export function playlistDetail (id, cookie) {
  return request({
    url: `/playlist/detail?id=${id}`,
  })
}

// 歌单评论
export function playlistComment (cid) {
  return request({
    url: `/comment/playlist?id=${cid}`
  })
}


// 歌单收藏者
export function playlistSubScribers (id) {
  return request({
    url: `/playlist/subscribers?id=${id}&limit=16`
  })
}


// 获取歌曲详情
export function getSongDetail (ids) {
  return request({
    url: `/song/detail`,
    params: {
      ids: ids
    },
  })
}


// 获取音乐 url 播放音乐
export function getSongUrl (songid) {
  return request({
    url: `/song/url?id=${songid}`
  })
}


// 刷新登录
export function refreshLogin () {
  return request({
    url: `/login/refresh`,
  })
}
