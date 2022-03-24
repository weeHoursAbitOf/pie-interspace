const app = {
  state: {
    //应用id
    appId: '',
    //终端
    terminal: 'web',
  },

  mutations: {
    SET_APPID: (state, appId) => {
      state.appId = appId
    },
    TOGGLE_DEVICE: (state, terminal) => {
      state.terminal = terminal
    }
  }

}

export default app
