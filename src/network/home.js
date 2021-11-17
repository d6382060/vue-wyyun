import { request } from './request'

// 密码登录
export function phoneLogin (phone, pssw) {
  return request({
    url: `/login/cellphone?phone=${phone}&password=${pssw}`,
  })
}
// 密码登录
export function captchaLogin (phone, captcha) {
  return request({
    url: `/login/cellphone?phone=${phone}&captcha=${captcha}`,
  })
}



// 验证码登录-获取验证码
export function getCaptcha (phone) {
  return request({
    url: `/captcha/sent?phone=${phone}`,
  })
}


// 验证码登录-验证码验证
export function validationCaptcha (phone, captcha) {
  return request({
    url: `/captcha/verify?phone=${phone}&captcha=${captcha}`,
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
export function personalized () {
  return request({
    url: `/personalized?limit=8`,
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
    url: `/cloudsearch?keywords= ${name}&type=${type}`,
  })
}
