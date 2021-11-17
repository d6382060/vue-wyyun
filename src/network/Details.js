import { request } from './request'

// 获取音乐的URL
export function getMusciUrl (id) {
  return request({
    url: `/song/url?id=${id}`,
  })
}


//歌单评论
export function getComment (id) {
  return request({
    url: `/comment/playlist?id=${id}`,
  })
}

//搜索
export function searchMusic (name, params) {
  return request({
    url: `/cloudsearch?keywords= ${name}`,
    params
  })
}