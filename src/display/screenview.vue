<template>
  <div class="screen" @click="toggleFullscreen">
    <transition :name="props.effect || 'fade'">
      <img 
        :key="currentIndex"
        :src="props.images[currentIndex]" 
        class="slide"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  effect: {
    type: String,
    default: "fade"
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const currentIndex = ref(0)
let interval = null

function startSlider() {
  clearInterval(interval)

  interval = setInterval(() => {
    if (props.images.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % props.images.length
    }
  }, props.duration)
}

onMounted(() => {
  startSlider()
})

watch(
  () => [props.images, props.duration, props.effect],
  () => {
    currentIndex.value = 0
    startSlider()
  },
  { deep: true }
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

/* ===========================
   1) Fade
=========================== */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* ===========================
   2) slide-left
=========================== */
.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.8s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* ===========================
   3) slide-right
=========================== */
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.8s ease;
}
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

/* ===========================
   4) slide-up
=========================== */
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.8s ease;
}
.slide-up-enter-from {
  transform: translateY(100%);
}
.slide-up-leave-to {
  transform: translateY(-100%);
}

/* ===========================
   5) slide-down
=========================== */
.slide-down-enter-active, .slide-down-leave-active {
  transition: transform 0.8s ease;
}
.slide-down-enter-from {
  transform: translateY(-100%);
}
.slide-down-leave-to {
  transform: translateY(100%);
}

/* ===========================
   6) zoom-in
=========================== */
.zoom-in-enter-active, .zoom-in-leave-active {
  transition: transform 0.8s ease, opacity 0.8s ease;
}
.zoom-in-enter-from {
  transform: scale(1.2);
  opacity: 0;
}
.zoom-in-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

/* ===========================
   7) zoom-out
=========================== */
.zoom-out-enter-active, .zoom-out-leave-active {
  transition: transform 0.8s ease, opacity 0.8s ease;
}
.zoom-out-enter-from {
  transform: scale(0.8);
  opacity: 0;
}
.zoom-out-leave-to {
  transform: scale(1.2);
  opacity: 0;
}

/* ===========================
   8) zoom-fade
=========================== */
.zoom-fade-enter-active, .zoom-fade-leave-active {
  transition: transform 0.9s ease, opacity 0.9s ease;
}
.zoom-fade-enter-from {
  transform: scale(1.15);
  opacity: 0;
}
.zoom-fade-leave-to {
  transform: scale(0.85);
  opacity: 0;
}

/* ===========================
   9) flip-h
=========================== */
.flip-h-enter-active, .flip-h-leave-active {
  transition: transform 0.8s ease, opacity 0.8s ease;
  transform-style: preserve-3d;
}
.flip-h-enter-from {
  transform: rotateY(90deg);
  opacity: 0;
}
.flip-h-leave-to {
  transform: rotateY(-90deg);
  opacity: 0;
}

/* ===========================
   10) flip-v
=========================== */
.flip-v-enter-active, .flip-v-leave-active {
  transition: transform 0.8s ease, opacity 0.8s ease;
  transform-style: preserve-3d;
}
.flip-v-enter-from {
  transform: rotateX(90deg);
  opacity: 0;
}
.flip-v-leave-to {
  transform: rotateX(-90deg);
  opacity: 0;
}

/* ===========================
   11) rotate
=========================== */
.rotate-enter-active, .rotate-leave-active {
  transition: transform 0.8s ease, opacity 0.8s ease;
}
.rotate-enter-from {
  transform: rotate(-15deg);
  opacity: 0;
}
.rotate-leave-to {
  transform: rotate(15deg);
  opacity: 0;
}

/* ===========================
   12) kenburns
=========================== */
.kenburns-enter-active {
  animation: kenburns-in 6s ease forwards;
}
.kenburns-leave-active {
  animation: kenburns-out 6s ease forwards;
}

@keyframes kenburns-in {
  0% {
    transform: scale(1.2) translate(20px, 20px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
}

@keyframes kenburns-out {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1.2) translate(-20px, -20px);
    opacity: 0;
  }
}
</style>
