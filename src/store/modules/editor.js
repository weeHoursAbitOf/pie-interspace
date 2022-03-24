const editor = {
    state: {
        editor: undefined
    },
    mutations: {
        EDITOR: (status, data) => {
            status.editor = data
        }
    },
    actions: {
        editor({
            commit
        }, payload) {
            commit("EDITOR", payload)
        }
    }
}

export default editor