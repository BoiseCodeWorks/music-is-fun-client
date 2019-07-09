<template>
    <div class="navigation w-100 mb-4">
      <div class="col d-flex justify-content-center">
          <h1 v-if="title" data-toggle="toggle" data-placement="top" title="Back to Home" class="action nav-title" @click="$router.push({name: 'home'})">{{title}}</h1>
          <h1 class="nav-title" v-else>M<img class="nav-img fa-puls" src="../assets/logo.png" />sic Is Fun</h1>
      </div>
      <i @click="navCount++" :class="navCount % 2 ? 'far fa-times-circle text-white' : 'fas fa-bars color ts-white mr-3'" class="fa-2x side-nav-btn action" aria-label="toggle menu" data-target=".side-nav" data-toggle="collapse"></i>
      <div class="side-nav col-7 col-md-2 bg collapse">
         <div class="d-flex flex-column h-100 w-100">
            <button v-for="l in links" :key="l.name" :class="$route.name == l.routeName ? 'disabled btn-light'+l.class : 'btn-outline-light'+l.class" class="btn mb-1" @click="$router.push({name: l.routeName})">{{l.name}}</button>
            <slot></slot>
            <button @click="setBaseURL" class="btn btn-outline-light mb-1 mt-5">{{baseURL}}</button>
         </div>
      </div>
   </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
   name: "navigation",
   props: ['title'],
   data() {
      return {
          navCount: 0,
          links: [{name: "Home", routeName: "home", class: ''}, 
                  {name: "Playlists", routeName: "playlists", class: ''},
                  {name: "Documentation", routeName: "documentation", class: " order-1"}]
      }
   },
   computed: {
       baseURL() {
           return this.$store.state.baseURL || '//localhost:3000/api'
       }
   },
   methods: {
       setBaseURL() {
           Swal.fire({
               title: 'Change your server address?',
               text: "Note: The url will be formatted for you. Just provide the port number.",
               input: 'number',
               inputAutoTrim: true,
               showCancelButton: true,
               inputPlaceholder: 'e.g., 3000',
               preConfirm: port => {
                   if(!port) return
                   this.$store.dispatch('setBaseURL', port)
                   setTimeout(() => this.$store.dispatch('cstmAlrt', {method: 'toast', title: 'Port Updated'}), 100)
               }
           })
       }
   },
   components: {}
}
</script>

<style>
.navigation {
   box-shadow: 0 -2px 10px 1px black;
   background-image: url('https://d36zo2s4q1lc88.cloudfront.net/wp-content/uploads/2018/11/20152349/Example-1.jpg');
   background-position: bottom;
}
.nav-title {
   color: var(--light);
   text-shadow: 5px 5px black;
}
.nav-img {
   height: 35px;
   width: 35px;
   border-radius: 50%;
}
.side-nav-btn {
    position: absolute;
    right: 1vw;
    top: 1.5vh;
    z-index: 2;
}
.side-nav {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
    box-shadow: 0 0 100px 10px black;
    padding-top: 20vh;
    height: 100vh;
}
.fa-pulse {
   animation-iteration-count: 2;
}
</style>
