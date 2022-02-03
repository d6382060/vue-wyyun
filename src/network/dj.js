import { request } from './request'

// 电台 - 分类
export function djCatelist () {
  return request({
    url: `/dj/catelist`,
  })
}

// 推荐节目
export function recommendProgram () {
  return request({
    url: `/program/recommend`,
  })
}

// 节目排行榜
export function programTopList () {
  return request({
    url: `/dj/program/toplist?limit=10`,
  })
}

//电台 - 分类推荐
export function djRecommendType (type) {
  return request({
    url: `/dj/recommend/type?type=${type}`,
  })
}
//电台 - 类别热门电台
export function hotDjRadio (params) {
  return request({
    url: `/dj/radio/hot`,
    params
  })
}

//电台 - 详情
export function detailDj (id) {
  return request({
    url: `/dj/detail?rid=${id}`,
  })
}
// 电台 - 节目
export function programlDj (params) {
  return request({
    url: `/dj/program`,
    params
  })
}

// 电台 - 节目详情
export function djProgramlDetail (id) {
  return request({
    url: `/dj/program/detail?id=${id}`,
  })
}