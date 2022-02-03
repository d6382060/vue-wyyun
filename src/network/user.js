import { request } from './request'

// 获取用户详情
export function getaccount (id) {
  return request({
    url: `/user/detail?uid=${id}`,
  })
}


// 获取用户等级信息
export function getlevel () {
  return request({
    url: `/user/level`,
  })
}

//获取用户信息 , 歌单，收藏，mv, dj 数量
export function getsubcount () {
  return request({
    url: `/user/subcount`,
  })
}

//获取用户歌单
export function getuserPlaylist (params) {
  return request({
    url: `/user/playlist`,
    params
  })
}

// 获取用户听歌排行
export function getuserRecord (params) {
  return request({
    url: `/user/record`,
    params
  })
}