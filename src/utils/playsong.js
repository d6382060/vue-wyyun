// 时间处理
export function dateInit (publishTime) {
  let time = new Date(publishTime)
  return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`
}

// 时分秒秒拍
export function timeInit (time) {
  let minutes = Math.floor((time % 3600000) / 60000); //分
  let seconds = Math.floor((time % 60000) / 1000); //秒
  return `${minutes >= 10 ? minutes : '0' + minutes}分${seconds >= 10 ? seconds : '0' + seconds}秒`
}

// 数字转化 带万字
export function num (n) {
  let str = (n / 10000).toFixed(1)
  return str + '万'
}
// 延时执行
export function timeDelay (fn) {
  setTimeout(() => {
    fn()
  }, 800);
}