import http from './https'
import ApiSetting from './ApiSetting'
import verify from './Verify'
import GlobalAttr from './GlobalAttr'
import _ from 'lodash'

export default{
  install (Vue, options) {
    Vue.prototype.$http = http
    Vue.prototype.$api = ApiSetting
    Vue.prototype.$verify = verify
    Vue.prototype.$GlobalAttr = GlobalAttr
    Vue.prototype._ = _
  }
}
