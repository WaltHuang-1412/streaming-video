<style lang="scss">
.following {
  color: white;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &__list {
    width: 100%;
  }

  &__item {
    height: 100vh;
    width: 100%;
    position: relative;

    &__title {
      position: absolute;
      left: 10%;
      bottom: 5%;
    }
    &__cover {
      width: 100%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}
</style>
<template lang="pug">
.following(ref="followingElement")
  .following__list
    .following__item(v-for="item in data")
      .following__item__cover(:style="{backgroundImage: 'url(' + item.cover + ')'}")
      .following__item__title {{ item.title }}
</template>
<script lang="ts">
import { defineComponent, ref, Ref, toRefs, onMounted } from 'vue'
import { getFollowingList } from '@/library/axios/api'
import { ITestResponse } from '@/types'
import { useScroll, useScrollLock } from '@vueuse/core'
export default defineComponent({
  name: 'Following',
  setup() {
    const followingElement: Ref<HTMLElement | null> = ref(null)
    const data: Ref<null | ITestResponse[]> = ref(null)
    const isLocked = useScrollLock(followingElement)
    const { directions } = useScroll(followingElement, {
      throttle: 1000,
      onScroll: handleScroll
    })

    const { bottom: toBottom } = toRefs(directions)

    const getData = async () => {
      const { items } = await getFollowingList()
      data.value = items
    }
    function handleScroll(event: Event) {
      // if (toBottom.value) {
      // }
    }
    const initialize = () => {
      isLocked.value = true
      console.log('isLocked :>> ', isLocked)
      getData()
    }

    initialize()

    onMounted(() => {
      console.log('123 :>> ', 123)
    })
    return {
      data,
      followingElement
    }
  }
})
</script>
