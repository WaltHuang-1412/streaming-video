import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { IUserProfileResponse } from '@/types'
// import { getUserProfileApi } from '@/library/axios/api'
import { isObject } from 'lodash'

export interface IState {
  useProfile: IUserProfileResponse | null
}

export const storeKey: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
  state: {
    useProfile: null
  },
  getters: {},
  mutations: {
    SetUserProfile(state, value: IUserProfileResponse | null) {
      state.useProfile = value
    }
  },
  actions: {
    getUserProfile: async (context) => {
      // const data: IUserProfileResponse = await getUserProfileApi()
      const data = null
      if (isObject(data)) {
        context.commit('SetUserProfile', data)
      } else {
        context.commit('SetUserProfile', null)
      }
    }
  },
  modules: {}
})

export function useStore() {
  return baseUseStore(storeKey)
}
