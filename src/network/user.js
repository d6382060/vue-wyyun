import { request } from './request'

// 获取账号信息
export function getaccount () {
  return request({
    url: `/user/account`,
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

//获取用户绑定信息
export function getuserPlaylist (uid) {
  return request({
    url: `/user/playlist`,
    params: {
      uid
    }
  })
}

// 获取用户听歌排行
export function getuserRecord (params) {
  return request({
    url: `/user/record`,
    params
  })
}