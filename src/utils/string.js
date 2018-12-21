export function cutString (string) {
  // eslint-disable-next-line no-redeclare
  // eslint-disable-next-line no-useless-escape
  let result = JSON.stringify(string).replace(/["[,n&\|\\\*^%$#@\-]/g, ' ')
  // console.log(result)
  return result
}
