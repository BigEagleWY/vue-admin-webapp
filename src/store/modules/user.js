import { login, getInfo } from '@/api/login'
import { Message } from 'element-ui'
import router, { resetRouter } from '@/router'

const state = {
  token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '', // 认证凭证'
  userName: '',
  userFullName:"",
  userAccountId:"",
  userHeadLogo:"",
  roles: [],
  introduce: '',
  accessMenus:[]
}
const mutations = {
  SET_TOKEN(state, val) {
    state.token = val
    sessionStorage.setItem('token', val)
  },
  DEL_TOKEN(state) {
    state.token = ''
    state.userName = ''
    state.roles = ''
    state.introduce = ''
    state.userFullName = ''
    state.userAccountId = ''
    state.userHeadLogo = ''
    state.accessMenus = []
    sessionStorage.removeItem('token')
  },
  SET_ROLES(state, val) {
    state.roles = val
  },
  SET_NAME(state, val) {
    state.userName = val
  },
  SET_INTRODUCE(state, val) {
    state.introduce = val
  },
  SET_ACCESS_MENUS(state,list){
    state.accessMenus = list
  }
}
const actions = {
  // user login
  _login({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      login(formdatas)
        .then(res => {
          if (res.code === 0) {
            if (res.data.success) {
              Message.success(res.data.msg)
              commit('SET_TOKEN', res.data.token)
            } else {
              Message.error(res.data.msg)
            }
            resolve(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loginOut({ commit }) {
    commit('DEL_TOKEN')
    resetRouter()
    router.push({
      path: '/login',
      query: {
        redirect: '/'
      }
    })
  },
  _getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(res => {
          if (res.code === 0) {
            const { name, roles, introduce } = res.data
            commit('SET_ROLES', roles)
            commit('SET_NAME', name)
            commit('SET_INTRODUCE', introduce)
          } else {
            Message.error(res.msg)
          }
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
