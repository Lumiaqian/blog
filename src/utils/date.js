export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
export function getNow () {
  let now = new Date()
  var Y = now.getFullYear()
  var M = now.getMonth() + 1
  M = M < 10 ? '0' + M : M // 不够两位补充0
  var D = now.getDate()
  D = D < 10 ? '0' + D : D
  var H = now.getHours()
  H = H < 10 ? '0' + H : H
  var Mi = now.getMinutes()
  Mi = Mi < 10 ? '0' + Mi : Mi
  var S = now.getSeconds()
  S = S < 10 ? '0' + S : S
  return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S
}
