import $axios from './index'

export function login(data) {
  const url = '/system/api/loginManage'
  return $axios.post(url, data)
}
export function getInfo() {
  const url = '/getInfo'
  return $axios.get(url)
}
