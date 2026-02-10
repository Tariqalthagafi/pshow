<template>
  <div class="screen" @click="toggleFullscreen">
    <img 
      :src="props.images[currentIndex]" 
      class="slide"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)

onMounted(() => {
  setInterval(() => {
    if (props.images.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % props.images.length
    }
  }, 3000)
})

// إعادة ضبط السلايدر عند وصول صور جديدة
watch(
  () => props.images,
  () => {
    currentIndex.value = 0
  }
)

function toggleFullscreen() {
  const el = document.documentElement
  if (!document.fullscreenElement) {
    el.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>

<style scoped>
.screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

</style>
