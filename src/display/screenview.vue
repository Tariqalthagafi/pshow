<template>
  <div class="screen" @click="toggleFullscreen">

    <div v-if="!loaded" class="loading-text">جاري تحميل الصور...</div>

    <Splide
      v-else
      :key="splideKey"
      :options="{
        type: props.effect === 'fade' ? 'fade' : 'loop',
        autoplay: true,
        interval: props.duration * 1000,
        speed: 900,
        pauseOnHover: false,
        pauseOnFocus: false,
        rewind: true,
        arrows: false,
        pagination: false,
      }"
      class="splide-container"
    >
      <SplideSlide v-for="(img, i) in props.images" :key="i">
        <img :src="img" class="slide" :class="props.effect" />
      </SplideSlide>
    </Splide>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { Splide, SplideSlide } from "@splidejs/vue-splide"
import "@splidejs/splide/dist/css/splide.min.css"

const props = defineProps({
  images: Array,
  duration: Number,
  effect: String   // fade / zoom / kenburns
})
console.log(props.effect)

const loaded = ref(false)
const splideKey = ref(0)

async function preloadImages(urls) {
  const promises = urls.map(url => {
    return new Promise(resolve => {
      const img = new Image()
      img.src = url
      img.onload = resolve
      img.onerror = resolve
    })
  })
  await Promise.all(promises)
}

onMounted(async () => {
  loaded.value = false
  await preloadImages(props.images)
  loaded.value = true

  document.documentElement.style.setProperty('--duration', props.duration + 's')
})

watch(() => props.images, async () => {
  loaded.value = false
  await preloadImages(props.images)
  loaded.value = true
  splideKey.value++
})

watch(() => props.duration, () => {
  document.documentElement.style.setProperty('--duration', props.duration + 's')
  splideKey.value++
})

watch(() => props.effect, () => {
  splideKey.value++
})

function toggleFullscreen() {
  const el = document.documentElement
  if (!document.fullscreenElement) el.requestFullscreen()
  else document.exitFullscreen()
}
</script>

<style scoped>
.screen {
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
}

.loading-text {
  color: white;
  font-size: 24px;
}

.splide-container,
.splide__slide {
  width: 100vw;
  height: 100vh;
}

.slide {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---------------------- */
/* تأثير Fade             */
/* ---------------------- */
.fade {
  animation: fadeEffect 1s ease-in-out;
}

@keyframes fadeEffect {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ---------------------- */
/* تأثير Zoom             */
/* ---------------------- */
.zoom {
  animation: zoomEffect var(--duration) ease-in-out infinite;
}

@keyframes zoomEffect {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

/* ---------------------- */
/* تأثير Ken Burns        */
/* ---------------------- */
.kenburns {
  animation: kenburnsEffect var(--duration) ease-in-out infinite;
}

@keyframes kenburnsEffect {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    transform: scale(1.15) translate(-20px, -20px);
  }
}
</style>
