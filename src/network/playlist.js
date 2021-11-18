import { request } from './request'

// 歌单详情
export function playlistDetail (id) {
  return request({
    url: `/playlist/detail?id=${id}`
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

