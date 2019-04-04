import { login, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'
import { setAES, getAES } from '@/libs/aes'
export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    team: '',
    user: ''
  },
  mutations: {
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
    setTeam(state, team) {
      state.team = team
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    // 登录
    handleLogin({ commit }, { userName, password }) {
      userName = userName.trim()
      password = setAES(password);
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(data => {
          commit('setToken', data)
          // let token = data.accessKey
          // let access = [];
          // data.user.roles.forEach(x => {
          //   x.permissions.forEach(y => {
          //     access.push(y.permissionCode);
          //   })
          // })
          // let avator = "/himg.png"
          // commit('setToken', token)
          // commit('setAvator', avator)
          // commit('setUserName', data.user.username)
          // commit('setUserId', data.user.adminId)
          // commit('setAccess', access)
          // commit('setHasGetInfo', true)
          // commit('setTeam', data.team)
          // commit('setUser', data.user)
          localStorage.setItem('set_token', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        //  如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        commit('setHasGetInfo', false)
        localStorage.setItem('user_data', null)
        localStorage.setItem('set_token', null)
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          // let data = JSON.parse(decodeURIComponent(localStorage.getItem("user_data")))
          getUserInfo().then(data => {
            let access = [];
            data.user.roles.forEach(x => {
              x.permissions.forEach(y => {
                access.push(y.permissionCode);
              })
            })
            if (access.includes("INTEGRAL_MANAGER") && access.includes("GAME_MANAGER")) {
              access.splice(access.indexOf("GAME_MANAGER"), 1);
            }
            let avator = "/himg.png"
            if (data.user.adminPortrait) {
              avator = data.user.adminPortrait;
            }
            commit('setAvator', avator)
            commit('setUserName', data.user.username)
            commit('setUserId', data.user.adminId)
            commit('setAccess', access)
            commit('setHasGetInfo', true)
            commit('setTeam', data.team)
            commit('setUser', data.user)
            localStorage.setItem('user_data', encodeURIComponent(JSON.stringify({ access, avator, user: data.user, team: data.team })))
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          commit('setToken', '')
          commit('setAccess', [])
          commit('setHasGetInfo', false)
          localStorage.setItem('user_data', null)
          localStorage.setItem('set_token', null)
          reject(error)
        }
      })
    }
  }
}
