<template>
  <div class="home row justify-content-center">
    <navigation />
    <div class="col-11">
      <form @submit.prevent="getTunes">
        <input autofocus placeholder="search those tunes..." required class="music-query w-100" name="music" type="text" v-model="query">
      </form>
      <div v-if="results.length" class="row songs">
        <song v-for="s in results" :key="s.audio" :s="s" />
      </div>
      <div class="cube" v-else>
        <div class='set'>
          <div class='item'></div>
          <div class='item'></div>
          <div class='item'></div>
          <div class='item'></div>
          <div class='item'></div>
          <div class='item'></div>
        </div>
        <div class='set'>
          <div class='item'></div>
          <div class='item'></div>
          <div class='item'></div>
          <div class='item'></div>
          <div class='item'></div>
          <div class='item'></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Song from '@/components/Song.vue'
export default {
  name: 'home',
  data(){
    return {
      query: '',
    }
  },
  computed: {
    results() {
      return this.$store.state.results
    }
  },
  methods: {
    getTunes() {
      this.$store.dispatch('getTunes', this.query)
    }
  },
  components: { Navigation, Song },
}
</script>

<style>
.music-query, .music-query:active, .music-query:focus {
    margin-left: 5px;
    margin-bottom: 5px;
    background-color: transparent;
    border: none;
    box-shadow: none;
    outline: none;
    border-bottom: 1px solid var(--main);
    color: var(--main);
    font-size: x-large;
    text-transform: capitalize;
}
.music-query:active, .music-query:focus {
    border-bottom-width: 2px;
}
.music-query::placeholder {
  color: var(--main);
  font-size: x-large;
}


/* Thanks Ana Tudor!! https://codepen.io/thebabydino/pen/meQbgX */
.cube {
  height: 75vh;
}
.cube *, .cube :before {
  position: absolute;
  top: 50%;
  left: 50%;
}

.set {
  opacity: 1;
  animation: switch 2s steps(1) infinite;
}
.set:nth-child(1) {
  transform: rotate(0deg) rotateX(-35.36deg) rotateY(45deg);
  transform-style: preserve-3d;
  animation-name: switch, rot3d;
  animation-timing-function: steps(1), linear;
}
.set:nth-child(1) .item {
  margin: -4em;
  width: 8em;
  height: 8em;
  background: red;
}
.set:nth-child(2) {
  animation-delay: -1s;
}
.set:nth-child(2) .item {
  /* Firefox line fix */
  filter: drop-shadow(0 0 1px currentColor);
}
.set:nth-child(2) .item:nth-child(odd):before {
  animation-name: rot-odd;
}
.set:nth-child(2) .item:nth-child(even):before {
  animation-name: rot-even;
}
.set:nth-child(2) :before {
  margin: -1.88562em -3.26599em;
  border: solid 0 tan;
  border-width: 5.65685em 3.26599em 0;
  border-color: currentColor transparent;
  transform-origin: 50% 1.88562em;
  animation: rot 2s linear infinite;
  content: '';
}

@keyframes switch {
  50% {
    transform: translate(-200vw);
  }
}
/* 3D animation */
@keyframes rot3d {
  50%, 100% {
    transform: rotate(-0.5turn) rotateX(215.36deg) rotateY(-135deg);
  }
}
.set:nth-child(1) .item:nth-child(1) {
  transform: rotateY(0deg) translateZ(4em);
  background: #ed0b71;
}
.set:nth-child(2) .item:nth-child(1) {
  transform: rotate(90deg) translateY(-3.77124em);
  color: #ed0b71;
}
.set:nth-child(1) .item:nth-child(2) {
  transform: rotateY(90deg) translateZ(4em);
  background: #690460;
}
.set:nth-child(2) .item:nth-child(2) {
  transform: rotate(150deg) translateY(-3.77124em);
  color: #ed0b71;
}
.set:nth-child(1) .item:nth-child(3) {
  transform: rotateY(180deg) translateZ(4em);
  background: #ed0b71;
}
.set:nth-child(2) .item:nth-child(3) {
  transform: rotate(210deg) translateY(-3.77124em);
  color: #690460;
}
.set:nth-child(1) .item:nth-child(4) {
  transform: rotateY(270deg) translateZ(4em);
  background: #690460;
}
.set:nth-child(2) .item:nth-child(4) {
  transform: rotate(270deg) translateY(-3.77124em);
  color: #690460;
}
.set:nth-child(1) .item:nth-child(5) {
  transform: rotateX(90deg) translateZ(4em);
  background: #0d014d;
}
.set:nth-child(2) .item:nth-child(5) {
  transform: rotate(330deg) translateY(-3.77124em);
  color: #0d014d;
}
.set:nth-child(1) .item:nth-child(6) {
  transform: rotateX(-90deg) translateZ(4em);
  background: #0d014d;
}
.set:nth-child(2) .item:nth-child(6) {
  transform: rotate(390deg) translateY(-3.77124em);
  color: #0d014d;
}

@keyframes rot-odd {
  0%, 60% {
    transform: none;
  }
  65% {
    transform: scale(0.8);
  }
  80% {
    transform: scale(0.2) rotate(-60deg);
  }
  95% {
    transform: scale(0.8) rotate(-120deg);
  }
  100% {
    transform: scale(1) rotate(-120deg);
  }
}
@keyframes rot-even {
  0%, 50% {
    transform: none;
  }
  55% {
    transform: scale(0.8);
  }
  70% {
    transform: scale(0.2) rotate(60deg);
  }
  85% {
    transform: scale(0.8) rotate(120deg);
  }
  90%, 100% {
    transform: scale(1) rotate(120deg);
  }
}

</style>
