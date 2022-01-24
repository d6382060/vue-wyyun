import { request } from './request'

// 歌单评论
export function playlistComment (params) {
  return request({
    url: `/comment/playlist?timestamp=${new Date().valueOf()}`,
    params
  })
}

// 给评论点赞
export function giveLike (params) {
  return request({
    url: `/comment/like?timestamp=${new Date().valueOf()}`,
    params
  })
}

