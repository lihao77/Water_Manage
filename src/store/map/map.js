const state = {
    layersInMap: [{a:1}],
};

const actions = {

};

const mutations = {
    SET_LAYERSINMAP(state, val) {
        state.layersInMap = val;
    }
};
const getters = {
    layersInMap: (state) => {return state.layersInMap }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};