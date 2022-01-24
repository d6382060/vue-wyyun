// 时间处理
export function dateInit (publishTime) {
  let time = new Date(publishTime)
  return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`
}

