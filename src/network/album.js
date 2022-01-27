import { request } from './request'

// 获取专辑内容
export function albumContent (id) {
  return request({
    url: `/album?id=${id}`,
  })
}

// 获取歌手专辑
export function singerAlbum (id) {
  return request({
    url: `/artist/album?id=${id}&limit=10`,
  })
}