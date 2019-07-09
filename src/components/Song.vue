<template>
    <div class="song col-12 col-md-3 col-lg-4">
       <div class="card m-2">
           <h2 class="card-header">{{s.title}}</h2>
           <img :src="s.albumArt" alt="Album Cover" class="card-img-top action">
           <div class="card-body">
               <h5>{{s.artist}}</h5>
               <div class="d-flex">
                    <p class="text-truncate">{{s.album}}</p>
                    <p>{{s.albumPrice}}</p>
               </div>
               <select v-if="!s._id" class="border-bottom w-100" v-model="playlistId" @change="addToPlaylist(s)">
                    <option value="Add To Playlist" selected disabled>Add to Playlist</option>
                    <option v-for="p in playlists" :key="p._id" :value="p._id">{{p.title}}</option>
                    <option :value="s">Create New Playlist</option>
                </select>
           </div>
       </div>
    </div>
</template>

<script>
export default {
   name: "song",
   props: {
       s: {
           type: Object,
           required: true
       }
   },
   data() {
      return {
        playlistId: 'Add To Playlist'
      }
   },
   computed: {
        playlists() {
            return this.$store.state.playlists
        },
   },
   methods: {
        addToPlaylist(s) {
            if (typeof this.playlistId == 'object') return this.$store.dispatch('createPlaylist', s)
        }
   },
   components: {}
}
</script>