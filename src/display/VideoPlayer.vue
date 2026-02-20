<template>
  <div class="video-wrapper" @click="forceFullscreen">
    <video
      ref="videoEl"
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
      playsinline
    ></video>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue"
import videojs from "video.js"
import "video.js/dist/video-js.css"
import "videojs-youtube"   // لدعم YouTube

const props = defineProps({
  url: String
})

const videoEl = ref(null)
let player = null

/* كشف نوع الرابط */
const isYouTube = url => url.includes("youtube") || url.includes("youtu.be")
const isVimeo = url => url.includes("vimeo")
const isDrive = url => url.includes("drive.google.com")
const isHLS = url => url.endsWith(".m3u8")

/* تحويل Google Drive */
function convertDrive(url) {
  const id = url.match(/\/d\/(.*?)\//)?.[1]
  return `https://drive.google.com/uc?export=download&id=${id}`
}

onMounted(() => {
  let source = {}

  if (isYouTube(props.url)) {
    source = {
      type: "video/youtube",
      src: props.url
    }
  } 
  else if (isVimeo(props.url)) {
    source = {
      type: "video/vimeo",
      src: props.url
    }
  }
  else if (isDrive(props.url)) {
    source = {
      type: "video/mp4",
      src: convertDrive(props.url)
    }
  }
  else if (isHLS(props.url)) {
    source = {
      type: "application/x-mpegURL",
      src: props.url
    }
  }
  else {
    source = {
      type: "video/mp4",
      src: props.url.replace("?dl=0", "?raw=1") // Dropbox
    }
  }

  player = videojs(videoEl.value, {
    autoplay: true,
    loop: true,
    controls: true,
    preload: "auto",
    fluid: true,
    sources: [source]
  })
})

onBeforeUnmount(() => {
  if (player) {
    player.dispose()
  }
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
.video-wrapper {
  width: 100%;
  height: 100%;
  background: black;
}

.video-js {
  width: 100%;
  height: 100%;
}
</style>
