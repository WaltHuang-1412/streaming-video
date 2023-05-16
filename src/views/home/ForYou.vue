<style lang="scss">
.for-you {
  width: 100%;
  height: 100%;
  color: white;
  .swiper-slide {
    position: relative;
    [data-is-hidden='true'] {
      display: none;
    }

    &__cover {
      width: 100%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      background-color: rgba($color: #000000, $alpha: 1);
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

    &__shadow {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
    }
  }
}
</style>
<template lang="pug">
swiper.for-you(v-if="isArray(data)" direction="vertical" @slide-change="handleSlideChange")
  template(v-for="(item,index) in data")
    swiper-slide
      .swiper-slide__cover(:style="{backgroundImage: 'url(' + item.cover + ')'}" :data-is-hidden="selectedVideo.id === index")
      //- .swiper-slide__title {{ item.title }}
      //- video(:ref="`video${index}`").swiper-slide__video
      //-   source(:src="item.play_url")
      .swiper-slide__shadow(:id="`test${index}`")
Teleport(v-if="selectedVideo.id >= 0" :to="`#test${selectedVideo.id}`")
  video-player.swiper-slide__video.vjs-big-play-centered( ref="videoRef"
                                                          :src="selectedVideo.src"
                                                          :poster='selectedVideo.cover')
  

</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, shallowRef, reactive } from 'vue'
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
    const selectedVideo = reactive({
      id: -1,
      src: '',
      cover: '',
      autoPlay: true
    })
    const videoRef: Ref<any> = ref(null)

    const handleMounted = (payload: any) => {
      player.value = payload.player
      console.log('Basic player mounted', payload)
    }

    const handleEvent = (log: any) => {
      console.log('Basic player event', log)
    }

    const handleSlideChange = (swiper: any) => {
      const { activeIndex } = swiper
      chooseVideo(activeIndex)
    }

    const chooseVideo = (value: number) => {
      selectedVideo.id = value
      if (data.value) {
        selectedVideo.src = data.value[value].play_url
        selectedVideo.cover = data.value[value].cover
      }

      if (videoRef.value) {
        console.log((videoRef.value))
      }
    }

    const initialize = async () => {
      await getData()
      chooseVideo(0)
    }

    onMounted(() => {
      initialize()
    })
    return {
      data,
      isArray,
      handleMounted,
      handleEvent,
      handleSlideChange,
      selectedVideo,
      videoRef
    }
  }
})
</script>
