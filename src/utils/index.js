/*
 * 格式化数字 金融数字
 * 参数说明：
 * number：要格式化的数字
 * decimals：保留几位小数
 * dec_point：小数点符号
 * thousands_sep：千分位符号
 * */
export const numberFormat = (number, decimals, decPoint, thousandsSep) => {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
    let sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
    let dec = typeof decPoint === 'undefined' ? '.' : decPoint
    let s = ''
    s = (prec ? n.toFixed(prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  }
  
  /*
  * 下载文件(本地文件)
  * */
  export const downloadStaticFile = (file, fileName = 'template') => {
    let a = document.createElement('a')
    a.href = file
    // 设置下载文件名称
    a.setAttribute('download', fileName)
    a.click()
  }
  
  /**
   * @desc 比较当前值类型
   * @param { any } val 传入的值
   * @param { string } type 校验的类型 比如 string number boolean。。。 需要类型值全称 大小写不限
   * @returns {string|boolean} 如果传入类型则进行比较返回比较结果 未传入则返回值对应类型
   */
  export const getType = (val, type) => {
    let valType = toString.call(val).substring(8, toString.call(val).length - 1)
    if (type) {
      return valType.toLocaleLowerCase() === type.toLocaleLowerCase()
    } else {
      return valType
    }
  }
  
  /**
   * 是否是ip地址
   * @param str
   * @returns {boolean}
   */
  export const isIP = (str) => {
    return /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(str)
  }
  
  /**
   * @description 移除对象的空字符串
   * @param obj
   * @returns {*}
   */
  
  export const removePropertyOfNull = (obj) => {
    Object.keys(obj).forEach(item => {
      if (getType(obj[item], 'string')) {
        if (!obj[item].length) delete obj[item]
      }
    })
    return obj
  }
  
  /**
   * session值获取
   * @param key
   * @returns {string|*}
   */
  export const sessionGet = (key) => {
    let value = ''
    if (!sessionStorage.getItem(key)) {
      return ''
    }
    try {
      value = JSON.parse(sessionStorage.getItem(key))
    } catch (err) {
      value = sessionStorage.getItem(key)
    }
    return value
  }
  
  /*
  * @desc session存储
  */
  export const sessionSet = (key, value) => {
    value = getType(value, 'string') ? value : JSON.stringify(value)
    sessionStorage.setItem(key, value)
  }
  
  /*
  * @desc localGet
  */
  export const localGet = (key) => {
    if (!localStorage.getItem(key)) {
      return ''
    }
    let value = ''
    try {
      value = JSON.parse(localStorage.getItem(key))
    } catch (err) {
      value = localStorage.getItem(key)
    }
    return value
  }
  
  /**
   *
   * @param key
   * @param value
   */
  export const localSet = (key, value) => {
    value = getType(value, 'string') ? value : JSON.stringify(value)
    localStorage.setItem(key, value)
  }
  
  /**
   * 查询当前树的的节点
   * @param arr
   * @param code
   * @constructor
   */
  export const FindTreeData = (arr, code) => {
    arr.forEach((item) => {
      if (item.access === code) {
        return item
      } else if (item.children != null) {
        FindTreeData(item.children, code)
      }
    })
  }
  
  /**
   * 判断是否为空对象
   * @param obj
   * @returns {boolean}
   */
  
  function isEmpty(obj){
    return  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
  }
  
  /**
   * 函数柯里化求和
   * @param args
   */
  function sum(...args){
    args.reduce((a, b) => a + b);
  }
  
  // let list =  [
  //   { "id": 12, "parent_id": 1, "name": "朝阳区" },
  //   { "id": 241, "parent_id": 24, "name": "田林街道" },
  //   { "id": 31, "parent_id": 3, "name": "广州市" },
  //   { "id": 13, "parent_id": 1, "name": "昌平区" },
  //   { "id": 2421, "parent_id": 242, "name": "上海科技绿洲" },
  //   { "id": 21, "parent_id": 2, "name": "静安区" },
  //   { "id": 242, "parent_id": 24, "name": "漕河泾街道" },
  //   { "id": 22, "parent_id": 2, "name": "黄浦区" },
  //   { "id": 11, "parent_id": 1, "name": "顺义区" },
  //   { "id": 2, "parent_id": 0, "name": "上海市" },
  //   { "id": 24, "parent_id": 2, "name": "徐汇区" },
  //   { "id": 1, "parent_id": 0, "name": "北京市" },
  //   { "id": 2422, "parent_id": 242, "name": "漕河泾开发区" },
  //   { "id": 32, "parent_id": 3, "name": "深圳市" },
  //   { "id": 33, "parent_id": 3, "name": "东莞市" },
  //   { "id": 3, "parent_id": 0, "name": "广东省" }
  // ]
  
  /**
   * 树形结构转换
   */
   function fn(list){
    let obj = {}
    let res = []
    for(let item of list){
        obj[item.id] = item
    }
    for(let item of list){
        if(obj[item.parent_id]){
            (obj[item.parent_id].children || (obj[item.parent_id].children = [])).push(item)
        }else{
            res.push(item)
        }
    }
    return res
  }
  // console.log(fn(list))
  
  // let list1 = [{ "id": 2, "parent_id": 0, "name": "上海市", "children": [{ "id": 21, "parent_id": 2, "name": "静安区" }, { "id": 22, "parent_id": 2, "name": "黄浦区" }, { "id": 24, "parent_id": 2, "name": "徐汇区", "children": [{ "id": 241, "parent_id": 24, "name": "田林街道" }, { "id": 242, "parent_id": 24, "name": "漕河泾街道", "children": [{ "id": 2421, "parent_id": 242, "name": "上海科技绿洲" }, { "id": 2422, "parent_id": 242, "name": "漕河泾开发区" }] }] }] }, { "id": 1, "parent_id": 0, "name": "北京市", "children": [{ "id": 12, "parent_id": 1, "name": "朝阳区" }, { "id": 13, "parent_id": 1, "name": "昌平区" }, { "id": 11, "parent_id": 1, "name": "顺义区" }] }, { "id": 3, "parent_id": 0, "name": "广东省", "children": [{ "id": 31, "parent_id": 3, "name": "广州市" }, { "id": 32, "parent_id": 3, "name": "深圳市" }, { "id": 33, "parent_id": 3, "name": "东莞市" }] }];
  function toarr(list){
      let arr = []
      let a = [].concat(list)
      while(a.length>0){
          let first = a.unshift()
          if(first.children){
              a = a.concat(first.children)
              delete first.children
          }
          arr.push(first)
      }
      return arr
  }
  // console.log(list1)