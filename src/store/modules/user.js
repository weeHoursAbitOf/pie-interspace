import storage from 'store'
import { ACCESS_TOKEN_SYSTEM, USER_NAME_SYSTEM } from '@/store/mutations'

const user = {
  state: {
    token: '' || storage.get(ACCESS_TOKEN_SYSTEM),
    userName: "",
    userId: 0
  },
  mutations: {
    USER_DATA: (status, data) => {
      storage.set(ACCESS_TOKEN_SYSTEM, data.token)
      storage.set(USER_NAME_SYSTEM, data.userData.userName)
      status.token = storage.get(ACCESS_TOKEN_SYSTEM)
      status.userName = storage.get(USER_NAME_SYSTEM)
    }
  },
  actions: {
    userData(
      { commit }
      , payload) {
      commit("USER_DATA", payload)
    }
  }
}

export default user
