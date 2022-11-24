import store from '../store'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import { Message } from 'element-ui'

// 返回传入数组的长度
export function ReturnArrayLength(val) {
  if (Array.isArray(val)) {
    if (val.length !== 0) {
      return val.length
    } else {
      return '无'
    }
  } else {
    return false
  }
}

// 将表格中有嵌套关系的数据取出来显示
export function transformBackstageDataToTableShow(val, key) {
  // console.log(val)
  // 判断是否是时间戳
  if (typeof (val[key]) === 'number' || val[key].toString.length === 13) {
    // 获奖证书中的时间只显示年份
    if (val.getDate) {
      return parseTime(val[key], '{y}')
    }
    return parseTime(val[key], '{y}/{m}/{d}')
  }
  return val[key]
}

// 将后端返回的带有嵌套对象的数据结构解构
export function transformBackstageDataToFrontData(val) {
  let obj1 = {}
  const obj2 = {}
  for (var i in val) {
    // 如果传进来的对象的字段中有对象属性的，将这个对象属性的字段拿出来放到大的对象中
    if (!Array.isArray(val[i])) {
       obj1 = { ...val[i] }
    } else {
      obj2[i] = val[i]
    }
  }
  var finallyObj = Object.assign(obj2, obj1)
  return finallyObj
}
// 将原有的表单数据转换成后端需要的参数格式
export function transformFormToParams(val, string) {
          const param = {}
          const obj = {}
          for (var i in val) {
            // 不是数组类型的放在一个对象中
            if (typeof (val[i]) !== 'object') {
              obj[i] = val[i]
              // 是数组类型的直接放进参数中
            } else {
              param[i] = val[i]
            }
          }
          // 将对象放进参数中
          param[string] = obj
          return param
}
// 把数组转换成用逗号分割开的字符串
export function ArrayTransform(Array) {
  if (Array) {
  if (Array.length === 0) {
    return '无'
  }
  let String = ''
  Array.map((item) => {
    for (var i in item) {
      if (i !== 'id') {
        String = String + item[i] + ` `
      }
    }
  })
  return String
  }
}

// 把数字转换成有千分位分隔符的字符串
export function NumberTransform(number) {
  if (typeof (number) === 'number') {
    const number_str = number.toFixed(2).toLocaleString()
    return number_str
  }
}

export function parseTime(time, cFormat) {
  if (!time) {
    return
  }
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 大小转换
export function sizeFormatter(num) {
  if (num < 1024) {
    return `${num}B`
  } else if (num >= 1024 && num < 1024 * 1024) {
    return `${(num / 1024).toFixed(2)}KB`
  } else if (num >= 1024 * 1024 && num < 1024 * 1024 * 1024) {
    return `${(num / 1024 / 1024).toFixed(2)}MB`
  } else if (num >= 1024 * 1024 * 1024) {
    return `${(num / 1024 / 1024 / 1024).toFixed(2)}G`
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    // console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function isInArray(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true
    }
  }
  return false
}

// 根据字典父code和子code 获取名字
export function getNameByCode(code, parentCode) {
  const dic = store.getters.dictMap[parentCode]
  return dic.find(item => item.code === code) ? dic.find(item => item.code === code).name : ''
}

// 下载文件
export function downloadFile(url, data) {
  axios({
    method: 'post',
    url: Vue.prototype.myUrl + url,
    headers: {
      'x-auth-token': getToken()
    },
    responseType: 'blob',
    data: data
  }).then(res => {
    if (res.data) {
      var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
      var downloadElement = document.createElement('a')
      var href = window.URL.createObjectURL(blob) // 创建下载的链接
      downloadElement.href = href
      downloadElement.download = res.headers.attachment // 下载后文件名
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href)
    }
  }).catch(res => {
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000
    })
  })
}

// 把列表数据转换为树形数据
export function treeListUtil(data, parentId) {
  const itemArr = []
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    if (node.parentId === parentId) {
      if (treeListUtil(data, node.id).length > 0) {
        node.children = treeListUtil(data, node.id)
      }
      itemArr.push(node)
    }
  }
  return itemArr
}

// 把true和false改为“是”，“否”
export function transformBoolean(data) {
  return data ? '是' : '否'
}

//性别转换
export function genderTransform(data) {
  if(data === 1){
    return '男'
  }

  if(data === 0){
    return '女'
  }
}