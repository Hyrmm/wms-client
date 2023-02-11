/*
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-11-11 11:25:40
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2023-02-05 17:05:40
 * @FilePath: \wms-client\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { getToken } from "@/utils/auth"
import App from "@/main"
// 创建axios实例


//环境
let baseURL

if (process.env.NODE_ENV == "online") {
  baseURL = "http://43.138.122.88:5000/api"
} else {
  baseURL = "http://127.0.0.1:5000/api"
}


const service = axios.create({
  baseURL
  // baseURL: "http://127.0.0.1:5000/api",
})


// 请求拦截器
service.interceptors.request.use(config => {

  config.headers['authorization'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 统一管理响应,不是正常返回数据,Message提示
    if (response.data.status != 200) {
      App.$message({
        message: response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
    // 401用户登陆失效重定向至登陆界面
    if (response.data.status == 401) {
      App.$router.replace({ name: 'login' })
    }
    return response
  },



  (error) => {
    console.log('[响应拦截器]:' + error)// for debug
    App.$message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


export default service


