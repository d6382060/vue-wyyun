import { request } from './request'

// 通知 - @我
export function forwards () {
  return request({
    url: `/msg/forwards`,
  })
}



// 私信
export function history (uid) {
  return request({
    url: `/msg/private/history`,
    params: {
      uid
    }
  })
}

// 通知 - 评论
export function getComments (uid) {
  return request({
    url: `/msg/comments`,
    params: {
      uid
    }
  })
}

// 通知 - 通知
export function getNotices () {
  return request({
    url: `/msg/notices`
  })
}