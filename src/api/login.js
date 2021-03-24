import $axios from './index'

export function login(data) {
  const url = '/system/api/loginManage'
  return $axios.post(url, data)
}
export function getInfo() {
  const url = '/getInfo'
  return $axios.get(url)
}

export function getLoginConfig() {
  const url = '/web-student/api/portal/theme/color/public/get'
  return $axios.get(url)
}





