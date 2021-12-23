import { request } from './request'

// 歌单分类
export function playlistCatlist () {
  return request({
    url: `/playlist/catlist`
  })
}


// 歌单 ( 网友精选碟 )
export function getTopPlaylist (params) {
  return request({
    url: `/top/playlist`,
    params
  })
}