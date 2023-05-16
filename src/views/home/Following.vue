<style lang="scss">
.following {
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
    &__video {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
    }
    &__shadow {
      position: absolute;
      width: 100%;
      height: calc(100% - 30px);
      left: 0;
      right: 0;
    }
    .vjs-control-bar {
      opacity: 1 !important;
    }
    .vjs-volume-panel,
    .vjs-play-control,
    .vjs-picture-in-picture-control,
    .vjs-fullscreen-control,
    .vjs-play-control {
      display: none;
    }
  }
}
</style>
<template lang="pug">
swiper.following(v-if="isArray(data)" direction="vertical" @slide-change="handleSlideChange")
  template(v-for="(item,index) in data")
    swiper-slide
      .swiper-slide__cover(:style="{backgroundImage: 'url(' + item.cover + ')'}" :data-is-hidden="selectedVideo.id === index")
      .swiper-slide__video(:id="`following${index}`")
      .swiper-slide__shadow(@click="handleShadowClick")
Teleport(v-if="selectedVideo.id >= 0" :to="`#following${selectedVideo.id}`")
  video-player.swiper-slide__video.vjs-big-play-centered( ref="videoRef"
                                                          :src="selectedVideo.src"
                                                          :poster='selectedVideo.cover'
                                                          :autoplay="selectedVideo.autoPlay"
                                                          :controls="selectedVideo.controls"
                                                          )
  

</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive, watch } from 'vue'
import { getForYouList } from '@/library/axios/api'
import { ITestResponse } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { isArray } from 'lodash'
import { VideoPlayer } from '@videojs-player/vue'
import { routeList } from '@/router'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'ForYou',
  components: { Swiper, SwiperSlide, VideoPlayer },
  setup() {
    const route = useRoute()
    const data: Ref<null | ITestResponse[]> = ref(null)
    const getData = async () => {
      const { items } = await getForYouList()
      data.value = items
    }
    const selectedVideo = reactive({
      id: -1,
      src: '',
      cover: '',
      autoPlay: false,
      controls: true
    })
    const videoRef: Ref<any> = ref(null)

    const handleSlideChange = (swiper: any) => {
      const { activeIndex } = swiper
      chooseVideo(activeIndex)
    }

    const chooseVideo = (value: number) => {
      if (data.value) {
        selectedVideo.src = data.value[value].play_url
        selectedVideo.cover = data.value[value].cover
        selectedVideo.id = value
      }
    }

    const handleShadowClick = () => {
      const element: HTMLElement = document.querySelector(
        '.following .vjs-play-control'
      ) as HTMLElement
      element.click()
    }

    const handlePlayClick = () => {
      const element: HTMLElement = document.querySelector(
        '.following .vjs-play-control'
      ) as HTMLElement
      if (element.classList.value.includes('vjs-paused')) {
        element.click()
      }
    }

    const handlePauseClick = () => {
      const element: HTMLElement = document.querySelector(
        '.following .vjs-play-control'
      ) as HTMLElement
      if (element.classList.value.includes('vjs-playing')) {
        element.click()
      }
    }

    const initialize = async () => {
      await getData()
      chooseVideo(0)
      if (route.name === routeList.homeFollowing) {
        selectedVideo.autoPlay = true
      }
    }

    watch(
      () => route.name,
      async (newValue) => {
        if (newValue === routeList.homeFollowing) {
          selectedVideo.autoPlay = true
          handlePlayClick()
        } else {
          handlePauseClick()
        }
      }
    )

    onMounted(() => {
      initialize()
    })
    return {
      data,
      isArray,
      handleSlideChange,
      selectedVideo,
      videoRef,
      handleShadowClick
    }
  }
})
</script>
