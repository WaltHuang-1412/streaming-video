<style lang="scss">
.for-you {
  width: 100%;
  height: 100%;
  color: white;
  .swiper-slide {
    position: relative;
    &__cover {
      width: 100%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      background-color: rgba($color: #000000, $alpha: 0.3);
    }
    &__title {
      position: absolute;
      left: 10%;
      bottom: 5%;
    }
    &__video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<template lang="pug">
swiper.for-you(v-if="isArray(data)" direction="vertical")
  template(v-for="(item,index) in data")
    swiper-slide
      //- .swiper-slide__cover(:style="{backgroundImage: 'url(' + item.cover + ')'}")
      .swiper-slide__title {{ item.title }}
      //- video(:ref="`video${index}`").swiper-slide__video
      //-   source(:src="item.play_url")

      video-player.swiper-slide__video.vjs-big-play-centered( :src="item.play_url"
                                                              :currentSrc="item.play_url"
                                                              :poster='item.cover'
                                                              :autoplay="true")

</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, shallowRef } from 'vue'
import { getForYouList } from '@/library/axios/api'
import { ITestResponse } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { isArray } from 'lodash'
// import { VideoJsPlayer } from 'video.js'
import { VideoPlayer } from '@videojs-player/vue'
export default defineComponent({
  name: 'ForYou',
  components: { Swiper, SwiperSlide, VideoPlayer },
  setup() {
    const data: Ref<null | ITestResponse[]> = ref(null)
    const getData = async () => {
      const { items } = await getForYouList()
      data.value = items
    }
    const player = shallowRef<any>()

    const handleMounted = (payload: any) => {
      player.value = payload.player
      console.log('Basic player mounted', payload)
    }

    const handleEvent = (log: any) => {
      console.log('Basic player event', log)
    }

    const initialize = async () => {
      await getData()
    }

    onMounted(() => {
      initialize()
    })
    return { data, isArray, handleMounted, handleEvent }
  }
})
</script>
