<template lang="pug">
component(:is="layout")
  router-view

</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)
    return {
      layout
    }
  }
})
</script>

<style lang="scss">
@charset 'utf-8';
@import '//fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i';
@import '//fonts.googleapis.com/earlyaccess/notosanstc.css';
@import '//fonts.googleapis.com/css?family=Source+Sans+Pro';
@import '@/styles/_reboot';
@import '@/styles/transition';
@import '@/styles/element-plus';

body {
  font-family: 'Noto Sans TC';
  width: 100vw;
  height: 100vh;
  // height: calc(var(--vh, 1vh) * 100);
  min-width: 375px;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
