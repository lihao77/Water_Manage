const state = {
    name: window.localStorage.getItem('USERNAME') || null,
    token: window.localStorage.getItem('Authorization') || null,
    email: window.localStorage.getItem('EMAIL') || null,
};

const actions = {

};

const mutations = {
    TOKEN_INFO_RES(state, val) {
        state.name = val.name;
        state.token = val.token;
    },
    EMAIL_INFO(state, val) {
        state.email = val
    }
};
const getters = {
    email: (state) => { return state.email },
    name: (state) => { return state.name },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};