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







// 搜索
export function search (name) {
  return request({
    url: `/cloudsearch?keywords= ${name}`,
  })
}

// banner 轮播
export function banner () {
  return request({
    url: `/banner`,
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
    url: `/top/album?offset=0&limit=30`,
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