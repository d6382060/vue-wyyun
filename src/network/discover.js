import { request } from './request'

// 歌手分类列表
export function artistList (params) {
  return request({
    url: `/artist/list`,
    params
  })
}