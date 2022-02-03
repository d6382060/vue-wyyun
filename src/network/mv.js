import { request } from './request'

// 获取 mv地址
export function mvUrl (params) {
  return request({
    url: `/mv/url`,
    params
  })
}

// 获取 mv信息
export function detailmv (id) {
  return request({
    url: `/mv/detail?mvid=${id}`
  })
}
//获取 mv 点赞转发评论数数据
export function mvDetailInfo (id) {
  return request({
    url: `/mv/detail/info?mvid=${id}`
  })
}
// 相似 mv

export function mvSimi (id) {
  return request({
    url: `/simi/mv?mvid=${id}`
  })
}

// 收藏的 MV 列表
export function subMvList () {
  return request({
    url: `/mv/sublist`
  })
}

