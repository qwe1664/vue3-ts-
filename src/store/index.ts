import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import { getPageListData } from '@/service/main/system/system'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'hello word',
      age: 20,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1、请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2、保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
