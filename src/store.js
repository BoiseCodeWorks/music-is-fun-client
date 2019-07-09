import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import {toast, confirm} from './utils/swal-config.js'

Vue.use(Vuex)

let baseURL = localStorage.getItem('baseURL') || '//localhost:3000/api'
let _api = Axios.create({
  baseURL,
  timeout: 3000
})

export default new Vuex.Store({
  state: {
    playlists: [],
    baseURL: localStorage.getItem('baseURL')
  },
  mutations: {
    playlists(state, playlists) {
      state.playlists = playlists
    },
    baseURL(state, baseURL) {
      state.baseURL = baseURL
    }
  },
  actions: {
    cstmAlrt(_, config) {
      if(config.method == 'toast') toast(config)
      else confirm(config)
    },
    setBaseURL({dispatch: d, commit: c}, port) {
      if(port) {
        let baseURL = '//localhost:'+port+'/api'
        _api.defaults.baseURL = baseURL
        localStorage.setItem('baseURL', baseURL)
        c('baseURL', baseURL)
      }
      d('getPlaylists')
    },
    async getPlaylists({commit: c}) {
      let { data } = await _api.get('playlists')
      c('playlists', data)
    }
  }
})
