<template>
    <div class="playlists row">
        <navigation :title="'Playlists'"></navigation>
        playlists here
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
   name: "playlists",
   props: [],
   data() {
      return {}
   },
   computed: {},
   methods: {},
   components: { Navigation }
}
</script>