<template>
    <div class="documentation row">
        <navigation :title="'Documentation'"></navigation>
        doc here
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
   name: "documentation",
   props: [],
   data() {
      return {}
   },
   computed: {},
   methods: {},
   components: { Navigation }
}
</script>