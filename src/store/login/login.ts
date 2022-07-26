import { Module } from 'vuex'
import { IRootState } from '../types'
import { ILoginState } from './types'
import { IAccount } from '../../service/login/type'
import LocalCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '../../service/login/login'
import { userInfo } from 'os'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      const routes = mapMenusToRoutes(userMenus)

      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1、实现登录逻辑
      const LoginResult = await accountLoginRequest(payload)
      const { id, token } = LoginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      // 2、 请求用户信息

      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      // 3、请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 4、路由跳转
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (token) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (token) {
        commit('changeUserMenus', userMenus)
      }
    }

    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('这是手机登录的事件')
    // }
  }
}

export default loginModule
