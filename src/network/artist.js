import { request } from './request'

// 获取歌手详情
export function artistDetail (id) {
  return request({
    url: `/artist/detail?id=${id}`,
  })
}
// 获取歌手单曲

export function getSingeMusic (singer_id) {
  return request({
    url: `/artists?id=${singer_id}`,
  })
}


// 获取歌手专辑
export function getSingeAlbum (params) {
  return request({
    url: `/artist/album`,
    params
  })
}


// 获取歌手 mv
export function getSingeMv (params) {
  return request({
    url: `/artist/mv`,
    params
  })
}

// 获取歌手描述
export function getSingedesc (id) {
  return request({
    url: `/artist/desc?id=${id}`,
  })
}


// 热门歌手
export function getHotSinger (params) {
  return request({
    url: `/top/artists`,
    params
  })
}