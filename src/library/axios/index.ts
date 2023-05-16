import axios from 'axios'
import { HttpsStatusCode } from '@/models'
// import router, { routeList } from '@/router'
import { ElMessage, ElNotification } from 'element-plus'
// import { isString, isObject } from 'lodash'

const axiosInstance = axios.create({
  baseURL: 'http://172.20.10.6:3000/',
  timeout: 3000
})
// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log('request config :>> ', config)
    // const token = localStorage.getItem('accessToken')
    // if (isString(token) && isObject(config.headers)) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  function (error) {
    // Do something with request error
    // console.log('request error :>> ', error)
    return Promise.reject(error)
  }
)
// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    const { status, statusText } = response
    // console.log('response :>> ', response)
    switch (status) {
      case HttpsStatusCode.SuccessCreated:
        ElNotification({
          message: statusText,
          type: 'success'
        })
        break
      case HttpsStatusCode.SuccessNoContent:
        ElNotification({
          message: statusText,
          type: 'success'
        })
        break
      default:
        break
    }
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log('response error :>> ', error)
    const { response } = error
    const { status, statusText } = response
    switch (status) {
      case HttpsStatusCode.ClientErrorUnauthorized:
        // ElMessage({
        //   message: statusText,
        //   type: 'error'
        // })
        // localStorage.removeItem('accessToken')
        // localStorage.removeItem('refreshToken')
        // localStorage.removeItem('accessTokenExp')
        // localStorage.removeItem('refreshTokenExp')
        // router.push({ name: routeList.login })
        break
      default:
        ElMessage({
          message: statusText,
          type: 'error'
        })
        break
    }

    return Promise.reject(error)
  }
)
export default axiosInstance
