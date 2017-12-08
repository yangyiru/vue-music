export function addClass(el, className) {
  if (hasClass(el, className)) { // 该DOM对象有这个类名时，什么都不做
    return
  }
  let newClass = el.className.split('') // 获取类名
  newClass.push(className)
  el.className = newClass.join('')
}

// 是否存在该类名
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)') // (\\s| 空白字符)
  return reg.test(el.className) // el.className 获取class
}
/* val=值  setAttribute：建立一个属性，并同时给属性捆绑一个值
   getAttribute：获取某一个属性的值
*/
export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

// js自动加浏览器前缀

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    ms: 'OTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}