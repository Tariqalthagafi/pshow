<template>
  <div class="screen" @click="forceFullscreen">

    <!-- اختيار المشغّل المناسب -->
    <ImageSlider
      :is="currentComponent"
      :items="props.items"
      :duration="props.duration"
      :pause="props.pause"
      :effect="props.effect"
    />

  </div>
</template>

<script setup>
import { computed } from "vue"

import ImageSlider from "./ImageSlider.vue"
import VideoPlayer from "./VideoPlayer.vue"

const props = defineProps({
  items: Array,
  duration: Number,   // مدة الأنيميشن
  pause: Number,      // مدة التوقف بين الصور (من قاعدة البيانات)
  effect: String
})

/* اختيار المشغّل المناسب */
const currentComponent = computed(() => {

  const hasImages = props.items.some(i => i.type === "images")
  const hasVideo = props.items.some(i => i.type === "video")

  if (hasImages && !hasVideo) {
    return ImageSlider
  }

  if (hasVideo) {
    return VideoPlayer
  }

  return null
})

/* ملء الشاشة */
function forceFullscreen() {
  const el = document.documentElement
  if (!document.fullscreenElement) {
    el.requestFullscreen().catch(() => {})
  }
}
</script>

<style scoped>
.screen {
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
}
</style>
