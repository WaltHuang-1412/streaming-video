<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  position: relative;
  white-space: nowrap;

  &__list {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, 0);
    height: 40px;
    color: white;

    .line {
      height: 30%;
      width: 1px;
      background-color: white;
      display: inline-block;
      vertical-align: middle;
      margin: 0 10px;
      opacity: 0.3;
    }
  }

  &__item {
    font-weight: 800;
    color: rgba($color: #ffffff, $alpha: 0.4);
    cursor: pointer;
    &[data-is-active='true'] {
      color: rgba($color: #ffffff, $alpha: 1);
      cursor: none;
    }
  }

  &__content {
    width: 200%;
    height: 100%;
    transition: transform 0.5s;

    &[data-active='homeForYou'] {
      transform: translate(-50%, 0);
    }

    &__left {
      width: 50%;
      height: 100%;
      display: inline-block;
      vertical-align: top;
    }
    &__right {
      width: 50%;
      height: 100%;
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
<template lang="pug">
.home
  .home__content(:data-active="$route.name")
    .home__content__left
      router-view(name="left")
    .home__content__right
      router-view(name="right")
  .home__list
    span.home__item(:data-is-active="$route.name === routeList.homeFollowing" @click="handleItemClick(routeList.homeFollowing)") Following
    span.line
    span.home__item(:data-is-active="$route.name === routeList.homeForYou" @click="handleItemClick(routeList.homeForYou)") For You
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { routeList } from '@/router'
export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const handleItemClick = (name: string) => {
      router.push({
        name
      })
    }
    return { routeList, handleItemClick }
  }
})
</script>
