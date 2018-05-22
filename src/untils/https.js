import axios from 'axios'
import qs from 'qs'
axios.interceptors.request.use(config => {
  //  显示loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})
function errorState (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
  }
}
function successState (res) {
  return res
}

const httpServer = (opts, data) => {
  let Public = {
  //  公共参数
    'token': '',
    'admin_sid': '',
    'ttime': ''
  }
  let httpDefaultOpts = {
  // http默认配置
    method: opts.method,
    baseURL: process.env.NODE_ENV === 'development' ? '' : ``,
    url: opts.url,
    timeout: 10000,
    params: Object.assign(Public, data),
    data: qs.stringify(Object.assign(Public, data)),
    headers: opts.method === 'get' ? {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    } : {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }
  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res)
        resolve(res.data)
      }
    ).catch(
      (response) => {
        errorState(response)
        reject(response)
      }
    )
  })
  return promise
}
export default httpServer
