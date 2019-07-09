import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import {toast, confirm} from './utils/swal-config.js'
import Song from './models/Song.js'
import Swal from 'sweetalert2';

Vue.use(Vuex)

let itunesBaseURL = 'https://itunes.apple.com/search?entity=song&term=',
baseURL = localStorage.getItem('baseURL') || '//localhost:3000/api'

let _api = Axios.create({
  baseURL,
  timeout: 5000
})

export default new Vuex.Store({
  state: {
    playlists: [],
    baseURL: localStorage.getItem('baseURL'),
    results: []
  },
  mutations: {
    playlists(state, playlists) {
      state.playlists = playlists
    },
    baseURL(state, baseURL) {
      state.baseURL = baseURL
    },
    results(state, results) {
      state.results = results
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
    },
    async getTunes({commit: c}, query = '') {
      let { data: { results } } = await _api.get(itunesBaseURL+query)
      c('results', results.map(s => new Song(s)))
    },
    createPlaylist({dispatch: d, commit: c}, song) {
      Swal.fire({
        title: 'Create a New Playlist',
        input: 'text',
        progressSteps: ['<i class="fas fa-headphones"></i>'],
        inputAutoTrim: true,
        showCancelButton: true,
        inputPlaceholder: 'e.g., Bangerz',
        preConfirm: title => {
          if(!title) return
          saveToDB(title)
        }
      })
      async function saveToDB(title) {
        try {
          //TODO don't use subdocuments but instead a relational table
          let { data: playlist } = await _api.post('playlists', {title, songs: song ? [song] : []})
          c('addPlaylist', playlist)
          setTimeout(() => d('cstmAlrt', {method: 'toast', title: 'Playlist Created!'}), 100)
        } catch(e) {
          d('cstmAlrt', {method: 'toast', title: "Ah Oh!", text: e.message || "Error creating playlist", type: 'error', timer: 2000})
        }
      }
    }
  }
})
