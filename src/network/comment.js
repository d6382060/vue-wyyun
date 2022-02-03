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

// 专辑评论
export function albumComment (params) {
  return request({
    url: `/comment/album?timestamp=${new Date().valueOf()}`,
    params
  })
}
// mv 评论
export function mvComment (params) {
  return request({
    url: `/comment/mv?timestamp=${new Date().valueOf()}`,
    params
  })
}

// 电台节目评论
export function djComment (params) {
  return request({
    url: `/comment/dj?timestamp=${new Date().valueOf()}`,
    params
  })
}