import { request } from './request'

// 密码登录
export function phoneLogin (phone, pssw) {
  return request({
    url: `/login/cellphone?phone=${phone}&password=${pssw}`,
  })
}

// 获取用户详情
export function userDateil (cid) {
  return request({
    url: `/user/detail?uid=${cid}`,
  })
}


// 音乐是否可用
export function isMusic (id) {
  return request({
    url: `/check/music?id=${id}`
  })
}





// 搜索
export function search (name) {
  return request({
    url: `/cloudsearch?keywords= ${name}`,
  })
}

// banner 轮播
export function banner () {
  return request({
    url: `/banner?type=0`,
  })
}

// 热门歌单
export function personalized (num) {
  return request({
    url: `/personalized?limit=${num}`,
  })
}

// 新碟上架
export function newAlbum () {
  return request({
    url: `/album/newest`,
  })
}
// 全部新碟
export function allAlbum (params) {
  return request({
    url: `/album/new`,
    params
  })
}
// 最新专辑
export function newestAlbum (params) {
  return request({
    url: `/album/newest`,
    params
  })
}

// 榜单
export function topList () {
  return request({
    url: `/toplist`,
  })
}
// 榜单详细
export function topListdetail (id) {
  return request({
    url: `/playlist/detail?id=${id}`,
  })
}


// 歌手分类列表
export function artistList () {
  return request({
    url: `/artist/list`,
  })
}


// 热搜列表(详细)
export function searchHotDetail () {
  return request({
    url: `/search/hot/detail`,
  })
}

// 搜索
export function serach (name, type) {
  return request({
    url: `/cloudsearch?keywords=${name}&type=${type}`,
  })
}

// /退出登录

export function logout () {
  return request({
    url: `/logout`,
  })
}