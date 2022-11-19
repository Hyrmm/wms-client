import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: "http://127.0.0.1:3000/api", // api的base_url
  timeout: 5000 // 请求超时时间
})


// 请求拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(
  (response) => {

    //统一管理响应,不是正常返回数据,Message提示

    if (response.data.status != 200) {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return response
  },



  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


export default service


