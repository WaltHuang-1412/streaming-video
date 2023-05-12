<template lang="pug">
.layout-normal
  slot
  //- .layout-normal__popup-wrapper
  //-   .layout-normal__popup-container 
  //-     .layout-normal__popup
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LayoutNormal'
})
</script>
<style lang="scss">
.layout-normal {
  width: 100%;
  height: 100%;
  position: relative;

  &__popup-wrapper {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    justify-content: center;
    align-content: center;
    align-items: center;
    border: 1px solid red;
  }

  &__popup-container {
    width: 80%;
    height: 80%;
    background: radial-gradient(ellipse 80% 80% at center, #0064aa, #001428);
    opacity: 0.9;
  }

  &___popup {
    width: 100%;
    height: 100%;
  }
}
</style>
