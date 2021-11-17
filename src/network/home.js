import { request } from './request'

export function getmusic (parmas) {
  return request({
    url: `/search?keywords= ${parmas}`,
  })
}



// 轮播图
export function getBannerImg () {
  return request({
    url: '/banner',
  })
}

//推荐歌单
export function getMusicList () {
  return request({
    url: '/personalized?limit=8',

  })
}

//歌单详情动态
export function getPlaylistDetails (id) {
  return request({
    url: `/playlist/detail?id=${id}`,

  })
}

//获取音乐 url
export function getMusicUrl (MusicId) {
  return request({
    url: `/song/url?id=${MusicId}`,

  })
}



//新碟上架
export function getNewCd () {
  return request({
    url: `/top/album?offset=30&limit=30`,

  })
}