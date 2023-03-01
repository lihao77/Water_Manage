//该文件用于创建Vuex中的store

//引入Vue
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//引入axios
import axios from 'axios'

import token from './token/token'
import map from './map/map'
Vue.use(Vuex)

const RouterKeepAlive = {
    namespaced: true,
    actions: {

    },
    mutations: {
        SET_KEEP_ALIVE: (state, keepAlive) => {
            state.keepAlive = keepAlive
        },

    },
    state: {
        keepAlive: ["home"],
    },
    getters: {
        keepAlive: state => state.keepAlive
    }
}


export default new Vuex.Store({
    modules: {
        RouterKeepAlive,
        token,
        map
    },
    /* strict: true, */
})