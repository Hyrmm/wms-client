import axios from 'axios'
import { getToken } from "@/utils/auth"
import App from "@/main"



//环境
let baseURL

if (process.env.NODE_ENV == "online") {
  baseURL = "http://hyrm.site:5000/api"
} else if (process.env.NODE_ENV == "production") {
  baseURL = "http://hyrm.site:5000/api"
}
else {
  baseURL = "http://127.0.0.1:5000/api"
}


const service = axios.create({
  baseURL
})


// 请求拦截器
service.interceptors.request.use(config => {

  config.headers['authorization'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 统一管理响应,不是正常返回数据,Message提示
    if (response.data.status != 200) {
      App.$notify({
        title: '来自服务器失败提示',
        type: "error",
        message: response.data.msg,
      })
    }
    // 401用户登陆失效重定向至登陆界面
    if (response.data.status == 401) {
      App.$router.replace({ name: 'login' })
    }

    //成功的消息提示
    // if (response.data.status == 200) {
    //   App.$notify({
    //     title: '来自服务器成功提示',
    //     message: response.data.msg,
    //     type: 'success'
    //   });
    // }
    return response
  },



  (error) => {
    App.$message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


export default service


