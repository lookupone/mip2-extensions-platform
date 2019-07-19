/**
 * @file mip-ppkao-address 组件
 * @author
 */
export default class MIPExample extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let element = this.element
      let ele = $(this.element)
      let adTk = ele.find('.ad_tkBox')
      let addBtn = ele.find('.ad_tkBox ul li a')
      let addBtn0 = ele.find('.ad_tkBox ul li')
      let dq = ele.find('#dq_')
      let xlIcon = ele.find('.xia_icon')
      // let page = 1

      xlIcon.on('click', function () {
        adTk.toggle(200)
      })
      addBtn0.on('click', function () {
        $(this).addClass('lis_on').siblings().removeClass('lis_on')
      })
      addBtn.on('click', function () {
        page = 1
        addBtn0.addClass('lis_on').siblings().removeClass('lis_on')
        dq.text($(this).attr('values'))
        adTk.hide()
        getInfobyprovinceID($(this).attr('id'), $(this).attr('values'))
      })
      dq.on('click', function () {
        adTk.toggle(200)
      })
      function base64 (fun, val) {
        // private property
        let keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        // public method for encoding
        function encode (input) {
          let output = ''
          let chr1
          let chr2
          let chr3
          let enc1
          let enc2
          let enc3
          let enc4
          let i = 0
          input = utf8Encode(input)
          while (i < input.length) {
            chr1 = input.charCodeAt(i++)
            chr2 = input.charCodeAt(i++)
            chr3 = input.charCodeAt(i++)
            enc1 = chr1 >> 2
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
            enc4 = chr3 & 63
            if (isNaN(chr2)) {
              enc3 = enc4 = 64
            } else if (isNaN(chr3)) {
              enc4 = 64
            }
            output = output +
              keyStr.charAt(enc1) + keyStr.charAt(enc2) +
              keyStr.charAt(enc3) + keyStr.charAt(enc4)
          }
          return output
        }
        // public method for decoding
        function decode (input) {
          if (input === 'undefined' || input === null || undefined === '' || input === '0') {
            return input
          }
          let output = ''
          let chr1
          let chr2
          let chr3
          let enc1
          let enc2
          let enc3
          let enc4
          let i = 0
          input = input.replace(/[^A-Za-z0-9+/=]/g, '')
          while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++))
            enc2 = keyStr.indexOf(input.charAt(i++))
            enc3 = keyStr.indexOf(input.charAt(i++))
            enc4 = keyStr.indexOf(input.charAt(i++))
            chr1 = (enc1 << 2) | (enc2 >> 4)
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
            chr3 = ((enc3 & 3) << 6) | enc4
            output = output + String.fromCharCode(chr1)
            if (enc3 !== 64) {
              output = output + String.fromCharCode(chr2)
            }
            if (enc4 !== 64) {
              output = output + String.fromCharCode(chr3)
            }
          }
          output = utf8Decode(output)
          return output
        }
        // private method for UTF-8 encoding
        function utf8Encode (string) {
          string = string.replace(/\r\n/g, '\n')
          let utftext = ''
          for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n)
            if (c < 128) {
              utftext += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192)
              utftext += String.fromCharCode((c & 63) | 128)
            } else {
              utftext += String.fromCharCode((c >> 12) | 224)
              utftext += String.fromCharCode(((c >> 6) & 63) | 128)
              utftext += String.fromCharCode((c & 63) | 128)
            }
          }
          return utftext
        }
        // private method for UTF-8 decoding
        function utf8Decode (utftext) {
          let string = ''
          let i = 0
          let c = 0
          // let c1 = 0
          let c2 = 0
          let c3 = 0
          while (i < utftext.length) {
            c = utftext.charCodeAt(i)
            if (c < 128) {
              string += String.fromCharCode(c)
              i++
            } else if ((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i + 1)
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
              i += 2
            } else {
              c2 = utftext.charCodeAt(i + 1)
              c3 = utftext.charCodeAt(i + 2)
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
              i += 3
            }
          }
          return string
        }
        switch (fun) {
          case 'encode':
            return encode(val)
          case 'decode':
            return decode(val)
          default:
            break
        }
      }
      function decode (e) {
        let t = {}
        return Object.keys(e).forEach(function (a) {
          let i = e[a]
          if (Array.isArray(i)) {
            t[a] = []
            i.forEach(function (e) {
              t[a].push(decode(e))
            })
          } else {
            if (i instanceof Object) {
              t[a] = decode(i)
            } else {
              t[a] = base64('decode', i)
            }
          }
          return t
        })
      }
      console.log(element.dataset.categoryid)
      function getInfobyprovinceID (ID, name) {
        let kszxL = ele.find('#KSZX_1')
        page += 1
        kszxL.html('<h3>正在为您切换到' + name + '的考试资料，请稍等...</h3>')
        let url = 'http://192.168.1.190:8086/Interface/PageInfo.ashx?action=' + element.dataset.action
        if (element.dataset.categoryid) {
          url += '&CategoryID=' + element.dataset.categoryid
        }
        if (element.dataset.channelid) {
          url += '&channelID=' + element.dataset.channelid
        }
        if (ID) {
          url += '&dz=' + ID
        }
        $.ajax({
          url: url,
          type: 'POST',
          dataType: 'json',
          cache: false,
          // 加载执行方法
          error: function erryFunction (ERROR, CWXX) {
            kszxL.html('<h3>诶呀,数据迷路了!</h3>')
          },
          // 错误执行方法
          success: function (data) {
            // 对数据data处理，输出到html页面
            let list = data
            if (list.HTML === '') {
              kszxL.html('<h3>诶呀,没数据，换个地区试试吧!</h3>')
              return
            }
            kszxL.html(list.HTML)
          }
        })
      }
      window.onload = function () {
        $.ajax({
          url: '/Interface/YXK/PublicApi.ashx?action=GetProvince',
          type: 'POST',
          dataType: 'json',
          cache: false,
          error: function () {
            dq.innerText = '无法获取您的定位'
          },
          // 错误执行方法
          success: function (data) {
            data = decode(data)
            if (data.S === '0') {
              dq.innerText = '获取定位异常'
              return
            }
            let list = data.pList
            dq.innerText = list[0].ProvinceName
            getInfobyprovinceID(list[0].ID, list[0].ProvinceName)
          }
        })
      }
    }

    return customElement
  }
}